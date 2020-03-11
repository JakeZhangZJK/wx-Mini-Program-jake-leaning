// components/search/search.js
let keyWord = ''
Component({
  options: {
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      keyWord = e.detail.value
    },
    onSearch() {
      console.log(keyWord)
      //实现搜索有两种思路，
      //1.在本组件内
      //2.考虑组件复用性，可以将参数（keyWord）传出，由调用者决定
      this.triggerEvent('search', {
        keyWord
      })
    }
  }
})
