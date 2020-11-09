<template>
  <div>
    <div v-for="(r,i) in r2" :key="i">
      <!--<div v-for="(data, history_count) in r.clusters_history" :key="history_count">
        <div class="cell" :class="css.px" v-for="(image, image_key) in data" :key="image_key">
          <div v-for="(color, row) in image" :key="row" :style="getStyle({type:'gray', color:color})"></div>
        </div>
      </div>-->

      <table>
        <tr v-for="(images, cluster_key) in r.image_groups" :key="cluster_key">
          <td>
            <div class="cell" :class="css.px">
              <div v-for="(color, px) in r.last_clusters[cluster_key]" :key="px" :style="getStyle({type:'gray', color:color})"></div>
            </div>
          </td>
          <td>
            <div>
              <div class="cell" :class="css.px" v-for="(image, image_key) in images" :key="image_key">
                <div v-for="(color, px) in image" :key="px" :style="getStyle({type:'gray', color:color})"></div>
              </div>
            </div>
            <div>
              <div class="cell" :class="css.px" v-for="(image, image_key) in images" :key="image_key" :style="getStyle({type:'sabian', image_key:image_key})">
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Common from '@/components/Common'
import Analyze from '@/components/Analyze'

export default {
  mixins:[Common],

  data(){
    return{
      r2: {},
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

          a.setDefaultClusters(10, window.px**2)
          a.calcClustering(3)
          a.setImageGroups()

          let r2 = {}
          Object.keys(a.image_groups).forEach(i=>{
            let image_group = a.image_groups[i]
            let a2 = new Analyze({data: image_group})

            a2.setDefaultClusters(10, window.px**2)
            a2.calcClustering(3)
            a2.setImageGroups()

            r2[i] = {
              data: a2.data,
              clusters_history: a2.clusters_history,
              image_groups: a2.image_groups,
              last_clusters: a2.getLastClusters(),
            }

          })

          this.r2 = r2

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

          new_image.push(new_color)
        })

        new_data.push(new_image)
      })
      return new_data
    },
  },
}

</script>

