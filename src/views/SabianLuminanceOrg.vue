<template>
  <div>
    <div v-for="(data, history_count) in r.centers_history" :key="history_count">
      <div class="cell" :class="r.css.px" v-for="(image, image_key) in data" :key="image_key">
        <div v-for="(color, row) in image" :key="row" :style="getGrayBackground(color)"></div>
      </div>
    </div>

    <table>
      <tr v-for="(image_keys, center_key) in r.centers_class" :key="center_key">
        <div v-if="image_keys.length>0">
          <td>
            <div class="cell" :class="r.css.px">
              <div v-for="(color, row) in r.last_centers[center_key]" :key="row" :style="getGrayBackground(color)"></div>
            </div>
          </td>
          <td>
            <div>
              <div class="cell" :class="r.css.px" v-for="image_key in image_keys" :key="image_key">
                <div v-for="(color, row) in r.data[image_key]" :key="row" :style="getGrayBackground(color)"></div>
              </div>
            </div>
            <div>
              <div class="cell" :class="r.css.px" v-for="image_key in image_keys" :key="image_key" :style="getImage(image_key)">
              </div>
            </div>
          </td>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import Sabian from '@/components/Sabian'

export default {
  props: ['rr'],
  mixins:[Sabian],

  data(){
    return{
      r:  this.rr
    }
  },

  created(){
    this.mount()
  },

  methods: {

    mount(){
      const r = this.r
      const axios = require('axios')
      axios.get('https://opale-sabian.s3-ap-northeast-1.amazonaws.com/data/'+window.px+'px/luminance_org.json')
        .then(response => {
          r.data = response.data
          window.data = response.data

          for(var i=0; i<3; i++){
            this.getNearCenters()
            this.averageCenters()
          }

          r.centers_history = window.centers_history
          r.last_centers = this.getLastCenters()
          r.centers_class = this.classifyResults()

        }).catch(err => {
          console.log('err:', err)
        })
    }
  },
}

</script>

