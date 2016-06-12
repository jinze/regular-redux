let Provider = Component =>
  Component.implement({
    events: {
      $config: () =>
        this.__reduxStore = this.store
        // check if it is the only store in context
        // let storeCheck = component =>
        //   if(component)
        //   if(component.$parent){
        //     return storeCheck(component.$parent)
        //   }

    }
  })

export default Provider