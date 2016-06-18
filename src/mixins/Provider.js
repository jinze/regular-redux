let Provider = Component =>
  Component.implement({
    events: {
      $config: function(){
        this.__reduxStore = this.store

        // check if it is the only store in context
        let parentNode = this.$parent
        while(parentNode){
          if(parentNode.__reduxStore){
            throw new Error('More than one store in Provider context')
          }
          parentNode = parentNode.$parent
        }

      }

    }
  })

export default Provider
