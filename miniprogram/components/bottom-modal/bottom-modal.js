// components/bottom-modal/bottom-modal.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots:true
    // styleIsolation:"apply-shara" //样式阻隔
  },
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean,
    modalName:String
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
    onClose(e) {
      this.setData({
        modalShow: false
      })
    }
  }
})