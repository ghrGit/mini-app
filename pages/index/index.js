//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrl:"/assets/image/sister.png",
    addImgUrl:"/assets/image/addIcon.png",
    btnImgUrl:"/assets/image/calc.png",
    deleteImgUrl:"/assets/image/delete.png",
    list:[{id:0,money:'',payMoney:0}],
    freeMoney:'',
    sum:0,
    footBoxMoney:'',
    deliverFee:''
  },

  addOne: function () {
  let {list,id} = this.data;
  list.push({id:++id,money: '', payMoney: 0 });
  this.setData({list,id})
  },  
  deleteOne: function (e) {
    let {list} = this.data;
    let id = e.currentTarget.dataset.id;
    this.data.list = list.filter(item=>{return item.id !=id});
    this.setPayMoney();
    // this.setData({list})
    },
    changeMoney:function(e){
      console.log(22);
      let {list} = this.data;
      let id = e.currentTarget.dataset.id;
      let value = e.detail.value;
     this.data.list = list.map(item => {
        if(item.id == id) item.money = this.roundFixed(value);
        return item;
      });
     this.setPayMoney();

    },
    changeFreeMoney:function(e){
      this.data.freeMoney = this.roundFixed(e.detail.value);
      this.setPayMoney();           
    },
    setPayMoney:function(){
     let { list, freeMoney, deliverFee, footBoxMoney} = this.data;
     let  tempDeliverFee = deliverFee||0;
     let  tempFootBoxMoney = footBoxMoney||0;
     let tempFreeMoney = freeMoney ||0;
     var sum = 0;
     var otherFee = parseFloat(tempDeliverFee) + parseFloat(tempFootBoxMoney);
      list.forEach(item => sum += parseFloat(item.money||0));
      list.forEach(item=>{
        var tempMoney = parseFloat(item.money||0);  
        item.payMoney = this.roundFixed((tempMoney - (tempMoney / sum * parseFloat(tempFreeMoney)) + (tempMoney / sum * otherFee)).toString());
      })     
      this.setData({ list, sum:(sum+otherFee).toFixed(2), freeMoney, footBoxMoney, deliverFee});
    },
    roundFixed:function(number, fixed = 2){
          //先把非数字的都替换掉，除了数字和. 
          number = number.replace(/[^\d\.]/g,''); 
          //必须保证第一个为数字而不是. 
          number = number.replace(/^\./g,'0.'); 
          //保证只有出现一个.而没有多个. 
          number = number.replace(/\.{2,}/g,'.'); 
          //保证.只出现一次，而不能出现两次以上 
          number = number.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
           //只能输入两个小数
          number = number.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
          return number;
    },
    changeDeliverFeeMoney:function(e){
      console.log(111);
      this.data.deliverFee = this.roundFixed(e.detail.value);
      this.setPayMoney();
    },
    changeFootBoxMoney: function (e) {
      this.data.footBoxMoney = this.roundFixed(e.detail.value);
      this.setPayMoney();      
    }
})
