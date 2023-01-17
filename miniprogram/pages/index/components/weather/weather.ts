Component({
  data: { // 初始化默认值
    city: "北京",
    location: "",
    temp: "0",
    text: "注意天冷加衣"
  },
  lifetimes: {
    attached() {
      let self = this;
      wx.getLocation({
        success: function(res: any) {
          self.setData({location: `${res.longitude},${res.latitude}`})
          self.getWeather(self.data.location);
          self.getCity(self.data.location);
        }
      })
    }
  },
  methods: {
    getWeather: function(location: string) {
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now?',
        data: {
          key: 'c4eeaa61a30348d39cc9aa36c1c17702',
          location: location
        },
        success: (res: any) => {
          const data = res.data;
          this.setData({temp: data.now.temp});
          // 做一个判断，不同温度不同提醒文字
          if(Number(this.data.temp) >= 15) {
            this.setData({text: '温度正好，出门散心'});
          } else {
            this.setData({text: '注意天凉'});
          }
        },
        fail: (err) => {
          console.log(err);
        }
      })
    },
    getCity: function(location: string) {
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?',
        data: {
          key: 'c4eeaa61a30348d39cc9aa36c1c17702',
          location: location
        },
        success: (res: any) => {
          const loc = res.data.location[0];
          this.setData({city: `${loc.country}${loc.adm1}${loc.adm2}市`})
        },
        fail: (err) => {
          console.log(err);
        }
      })
    }
  }
})
