<template>
  <div v-for="(data, history_count) in r.centers_history" :key="history_count">
    <div class="cell" v-for="(image, image_key) in data" :key="image_key">
      <div v-for="(color, row) in image" :key="row" :style="f.getGrayBackground(color)"></div>
    </div>
  </div>

  <table>
    <tr v-for="(image_keys, center_key) in r.centers_class" :key="center_key">
      <div v-if="image_keys.length>0">
        <td>
          <div class="cell">
            <div v-for="(color, row) in r.last_centers[center_key]" :key="row" :style="f.getGrayBackground(color)"></div>
          </div>
        </td>
        <td>
          <div>
            <div class="cell" v-for="image_key in image_keys" :key="image_key">
              <div v-for="(color, row) in r.data[image_key]" :key="row" :style="f.getGrayBackground(color)"></div>
            </div>
          </div>
          <div>
            <div class="cell" v-for="image_key in image_keys" :key="image_key" :style="f.getImage(image_key)">
            </div>
          </div>
        </td>
      </div>
    </tr>
  </table>
<!--
  <div class="cell" v-for="(image, image_key) in r.data" :key="image_key">
    <div v-for="(color, row) in image" :key="row" :style="r.getBackground(color)"></div>
  </div>-->
</template>

<script>
import { reactive } from 'vue'

window.default_centers = getDefaultCenters(10, 25)
window.centers_history = [ window.default_centers ]

export default {
  props: ['f'],

  setup(props) {
    const r = reactive({
      data: [],
      centers_history: [],
      last_centers: [],
      centers_class: [],
    })

    const axios = require('axios')
    axios.get('https://opale-sabian.s3-ap-northeast-1.amazonaws.com/data/5px/luminance_org.json')
      .then(response => {
        r.data = response.data
        window.data = response.data

        for(var i=0; i<10; i++){
          props.f.getNearCenters()
          props.f.averageCenters()
        }

        r.centers_history = window.centers_history
        r.last_centers = props.f.getLastCenters()
        r.centers_class = props.f.classifyResults()

      }).catch(err => {
        console.log('err:', err)
      })

    return { r }
  },
}


function getDefaultCenters(count, row){
  console.log(count, row)
  //return [...Array( count )].map(() => [...Array( row )].map(() => Math.random() * 255))

  return [
    [255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,],
/*    [100,100,100,100,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,100,0,0,0,100,100,100,0,0,0,100,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100,],*/
  ]
}

</script>

