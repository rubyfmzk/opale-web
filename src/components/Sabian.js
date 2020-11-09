export default{
  methods: {
    getImage: function(image_key){
      return ';background-image:url(https://opale-sabian.s3-ap-northeast-1.amazonaws.com/base_image/'+(image_key+1).zeroPadding(3)+'.jpg)'
    },

    getGrayBackground: function(color){
      return ';background-color:rgb('+color.int()+','+color.int()+','+color.int()+')'
    },

    getNearCenters: function(){
      let centers = this.getLastCenters()
      let labels = Array(window.data.length).fill(0)

      window.data.forEach((image, image_key)=>{

        let scores = Array(centers.length).fill(0)

        image.forEach((color, row)=>{
          centers.forEach((center, center_key)=>{
            scores[center_key] += (color - center[row])**2
          })
        })

        labels[image_key] = scores.indexOf(Math.min(...scores))
      })

      window.current_labels = labels
    },

    averageCenters: function(){
      const centers_count = window.default_centers.length
      const pixel_count = window.default_centers[0].length
      let divisors = Array(centers_count).fill(0)
      let centers = [...Array( centers_count )].map(() => Array(pixel_count).fill(0))

      window.data.forEach((image, image_key)=>{
        const label = window.current_labels[image_key]

        divisors[label] += 1
        image.forEach((color, row)=>{
          centers[label][row] += color
        })
      })

      centers.forEach((center, center_key)=>{
        const divisor = divisors[center_key]

        if(divisor === 0) return

        center.forEach((color, row)=>{
          centers[center_key][row] = centers[center_key][row] / divisor
        })
      })

      window.centers_history.push(centers)
    },

    getLastCenters: function(){
      return window.centers_history[window.centers_history.length - 1]
    },

    classifyResults: function(){
      const centers_count = window.default_centers.length
      let centers_class = [...Array( centers_count )].map(() => [])

      window.current_labels.forEach((image_key, center_key)=>{
        centers_class[image_key].push(center_key)
      })

      window.centers_class = centers_class
      return centers_class
    },



  }
}
