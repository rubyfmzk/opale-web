<template>
  <div>
    <div v-for="(data, history_count) in r.clusters_history" :key="history_count">
      <div class="cell" :class="css.px" v-for="(image, image_key) in data" :key="image_key">
        <div v-for="(color, row) in image" :key="row" :style="getStyle({type:'gray', color:color})"></div>
      </div>
    </div>

    <table>
      <tr v-for="(image_keys, cluster_key) in r.image_groups" :key="cluster_key">
        <div v-if="image_keys.length>0">
          <td>
            <div class="cell" :class="css.px">
              <div v-for="(color, px) in r.last_clusters[cluster_key]" :key="px" :style="getStyle({type:'gray', color:color})"></div>
            </div>
          </td>
          <td>
            <div>
              <div class="cell" :class="css.px" v-for="image_key in image_keys" :key="image_key">
                <div v-for="(color, px) in r.data[image_key]" :key="px" :style="getStyle({type:'gray', color:color})"></div>
              </div>
            </div>
            <div>
              <div class="cell" :class="css.px" v-for="image_key in image_keys" :key="image_key" :style="getStyle({type:'sabian', image_key:image_key})">
              </div>
            </div>
          </td>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import Common from '@/components/Common'
import Analyze from '@/components/Analyze'

export default {
  mixins:[Common],

  data(){
    return{
      r: {},
      css:{
        px: 'px' + window.px
      }
    }
  },

  created(){
    this.mount()
  },

  methods: {

    mount(){
      const axios = require('axios')
      axios.get('https://opale-sabian.s3-ap-northeast-1.amazonaws.com/data/'+window.px+'px/luminance_org.json')
        .then(response => {
          const opt = {
            data: this.flattenContrast(response.data)
          }
          let a = new Analyze(opt)

          a.setDefaultClusters(4, window.px**2)
          a.calcClustering(3)
          a.setImageGroups()

          this.r = {
            data: a.data,
            clusters_history: a.clusters_history,
            image_groups: a.image_groups,
            last_clusters: a.getLastClusters(),
          }

        }).catch(err => {
          console.log('err:', err)
        })
    },

    flattenContrast(data){
      let new_data = []
      data.forEach((image)=>{
        const min = Math.min(...image)
        const max = Math.max(...image)
        const average = image.reduce((a,x) => a+=x,0) / image.length
        console.log(max,min,average)

        let new_image = []
        image.forEach((color)=>{

          let new_color = (max===min) ? max : (color-min) / (max-min) * 255

/*
          //let break_point1 = 255 * 0.8
          //let break_point2 = 255 * 0.2
          let break_point1 = (max + average) * 0.5
          let break_point2 = (min + average) * 0.5
          new_color = new_color > break_point1 ? 255 : (new_color < break_point2 ? 0 : 127)*/
          new_image.push(new_color)
        })

        new_data.push(new_image)
      })
      return new_data
    },
  },
}

</script>

