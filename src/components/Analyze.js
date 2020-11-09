module.exports = class Analyze{
  constructor(opt) {
    this.data = {}
    this.data_number = 0
    this.clusters_number = 0
    //this.current_k_means_centers = {}
    this.clusters_history = []
    this.image_cluster = {}//画像とクラスター
    this.image_groups = {}//クラスターに属する画像

    if(!opt) return
    if(opt.data) this.setData(opt.data)
  }

  calcClustering(clustering_count){
    for(var i=0; i<clustering_count; i++){
      this.searchNearCluster()
      this.calcClusterCentersOfGravity()
    }
  }


  calcClusterCentersOfGravity(){
    //const pixel_count = this.clusters_history[0].length
    let divisors = {}
    let centers_of_gravity = {}
//console.log(this.image_cluster)
    Object.keys(this.data).forEach(image_key=>{
      const cluster_key = this.image_cluster[image_key]
//console.log(this.data,image_key,centers_of_gravity, cluster_key)
      divisors[cluster_key] = divisors[cluster_key] ? divisors[cluster_key] + 1 : 1
      this.data[image_key].forEach((color, px)=>{
        if(!centers_of_gravity[cluster_key]) centers_of_gravity[cluster_key] = []
        if(!centers_of_gravity[cluster_key][px]) centers_of_gravity[cluster_key][px] = 0
        centers_of_gravity[cluster_key][px] += color
      })
    })
//console.log(centers_of_gravity, divisors)
    Object.keys(centers_of_gravity).forEach(cluster_key=>{
      const divisor = divisors[cluster_key]

      if(divisor === 0) return

      centers_of_gravity[cluster_key].forEach((color, px)=>{
        centers_of_gravity[cluster_key][px] = centers_of_gravity[cluster_key][px] / divisor
      })
    })
//console.log(centers_of_gravity)
    this.clusters_history.push(centers_of_gravity)
  }


  getLastClusters(){
    return this.clusters_history[this.clusters_history.length - 1]
  }

  getMinKey(array){
    let min_val = null
    let min_key = null
//console.log(array)
    Object.keys(array).forEach(k=>{
      const val = array[k]
//console.log(val, k)
      if(min_val === null ||
         val < min_val){
        min_val = val
        min_key = k
      }
    })
//console.log(array, min_key,min_val)
    return {key:min_key, val:min_val}
  }


  setImageGroups(){
    if(!this.data_number) return

    let image_groups = {}
console.log(this.image_cluster)
    Object.keys(this.image_cluster).forEach(image_key=>{
      const cluster_key = this.image_cluster[image_key]
      if(!image_groups[cluster_key]) image_groups[cluster_key] = {}
      image_groups[cluster_key][image_key] = this.data[image_key]
    })

    this.image_groups = image_groups
  }


  searchNearCluster(){
    if(!this.data_number) return

    let clusters = this.getLastClusters()
    let image_cluster = {}

    Object.keys(this.data).forEach((image_key)=>{
      let scores = {}

      this.data[image_key].forEach((color, px)=>{
        Object.keys(clusters).forEach(cluster_key=>{
          if(scores[cluster_key] === undefined) scores[cluster_key] = 0
          else scores[cluster_key] += (color - clusters[cluster_key][px])**2
        })
      })

      //距離が最小のクラスターキーを代入
      image_cluster[image_key] = this.getMinKey(scores).key
    })

    this.image_cluster = image_cluster
  }


  set(k, v){
    this[k] = v
  }


  setData(data){
    if(typeof data === 'object' && !Array.isArray(data)){
      this.data = data
      this.data_number = Object.keys(data).length
      return
    }

    let new_data = {}
    data.forEach((v,i)=>{
      new_data[i] = v
    })
    this.data = new_data
    this.data_number = Object.keys(new_data).length
  }

  setDefaultClusters(clusters_number, px_number){
    this.clusters_number = clusters_number
    this.clusters_history = []

    let default_clusters = {}
    Array( clusters_number ).fill(0).forEach((v,i)=>{
      default_clusters[i] = [...Array( px_number )].map(() => Math.random() * 255)
    })
    this.clusters_history[0] = default_clusters

  /*
    return [
      [0,255,255,255,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,255,0,0, 0,0,255,0,0, 0,0,0,0,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 255,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,255, 0,0,0,0,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,255,0,0, 0,0,255,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 0,255,0,255,0, 0,255,0,255,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
    ]*/

  }

}