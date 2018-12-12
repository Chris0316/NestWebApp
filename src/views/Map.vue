<template>
  <div class="map" ref="map"></div>
</template>

<script>

  export default {
    name: "Map",
    data() {
      return {
        map: null,
        pos: {
          lat: 14.5572707,
          lng: 121.0277651
        }
      }
    },
    mounted() {
      this.getPosition();
      this.initMap();
    },
    methods: {
      getPosition() {
        if (!navigator.geolocation) {
          this.$toast.info('您的设备不支持地理位置接口');
          return false;
        }
        let options = {
          enableHighAccuracy: true,
          maximumAge: 1000
        };
        navigator.geolocation.getCurrentPosition(position => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.map.setCenter(this.pos);
          this.map.setZoom(14);
        }, error => {
          switch (error.code) {
            case 1:
              this.$toast.info("位置服务被拒绝");
              break;
            case 2:
              this.$toast.info("暂时获取不到位置信息");
              break;
            case 3:
              this.$toast.info("获取信息超时");
              break;
            case 4:
              this.$toast.info("未知错误");
              break;
          }
        }, options);
        return true;
      },
      initMap() {
        this.map = new google.maps.Map(this.$refs.map, {
          center: this.pos,
          zoom: 8
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map {

  }
</style>
