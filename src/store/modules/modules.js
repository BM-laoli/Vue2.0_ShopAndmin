export default  {
  state: {
      state:{
          name:'厉害着'
      }
  },
  mutations: {
    //    注意啊，这里的名字不能喝下面的重复
      upadtaeName(state,payload){
          state.name = payload
      }
  },
  actions:{
      aupdateName( context ){
        setTimeout(() => {
            // 拿到这个操作对象 你就能干很多的东西了
            console.log(context);
        }, 1000);
      }
  },
  getters:{
    fullName(state){
        return state.name + '111'
    },

    // 如果我想要要自己毁掉呢？
    fullName2(state,getters){
        return  getters.fullName + '222'// 这里的fullNamez这里的getter指代的就是这个模块的getter
    },

    //如果我想用下面的大的对象的 爸爸的数据呢？
    fullName3(state,getters,rootState){
        return  getters.fullName + '222'// 这里的fullNamez这里的getter指代的就是这个模块的getter
        // rootState 就是我们的大的store的state
    },
  }
}