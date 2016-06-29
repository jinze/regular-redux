let handleChange = function(store){
  let currentState
  return function(){
    let nextState = store.getState()
    if(nextState !== currentState){
      currentState = nextState
      this.$emit('stateChanged', currentState)
    }
    setTimeout(function(){
      this.$update();
    }.bind(this), 0)
  }
}

let getStore = function(component){
  if(!component){
    return
  }
  if(component.__reduxStore){
    return component.__reduxStore
  }
  return getStore(component.$parent)
}

let Container = function(Component){
  Component.implement({
    events: {
      $config: function(){
        let alias = this.__reduxStoreAlias || 'store'
        this[alias] = this[alias] || getStore(this)
        let store = this[alias]
        if(!store){
          throw new Error('Redux Container should have a store.')
        }
        let changeState = handleChange(store).bind(this)
        let unsubscribe = store.subscribe(changeState)
        // fire the change event first
        changeState()
        this.$on('$destroy', unsubscribe)
      }
    }
  })
}

export default Container