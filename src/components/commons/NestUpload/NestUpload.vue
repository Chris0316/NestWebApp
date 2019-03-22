<template>
  <div class="nest-upload" v-if="currentVal.length > 0">
    <div class="upload-row" v-for="(rowNum, rowIndex) in Math.ceil((currentVal.length + 1) / 4)">
      <div class="upload-cell" :class="{ 'main': rowIndex === 0 && cellIndex === 0 }" v-for="(cellNum, cellIndex) in 4">
        <div class="upload-item img"
             v-if="rowIndex * 4 + cellIndex < currentVal.length"
             :style="{ backgroundImage: 'url(' + mediaInCell(rowIndex, cellIndex) + ')' }">
          <span class="close" @click="deleteImg(rowIndex, cellIndex)"></span>
        </div>
        <label class="upload-item add" v-else-if="rowIndex * 4 + cellIndex === currentVal.length">
          添加
          <input type="file" accept="image/*" @change="selectMedia" multiple class="hidden" />
        </label>
      </div>
    </div>
  </div>
  <label class="nest-upload empty" v-else>
    <!--添加图片/视频, video/*-->
    添加图片
    <input type="file" accept="image/*" @change="selectMedia" multiple class="hidden" />
  </label>
</template>

<script>
  import UploadService from '../../../services/UploadService';
  import lrz from 'lrz';

  export default {
    name: "nest-upload",
    props: {
      value: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        currentVal: this.value
      }
    },
    watch: {
      value(val) {
        this.currentVal = val;
      }
    },
    methods: {
      mediaInCell(rowIndex, cellIndex) {
        let mediaIndex = rowIndex * 4 + cellIndex;
        return this.currentVal[mediaIndex];
      },
      deleteImg(rowIndex, cellIndex) {
        let mediaIndex = rowIndex * 4 + cellIndex;
        this.currentVal.splice(mediaIndex, 1);
      },
      selectMedia(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        if (this.currentVal.length + files.length > 10) {
          this.$toast.info('您最多只能上传10张图片');
          return;
        }
        Object.keys(files).forEach((key) => {
          let file = files[key];
          // this.compressImg(file);
          this.compressImg2(file);
        })
      },
      compressImg2(file) {
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let img = new Image(),
            size = file.size,
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');
          img.src = reader.result;
          img.onload = () => {
            // 图片原始尺寸
            let originWidth = img.width;
            let originHeight = img.height;
            // 最大尺寸限制
            let maxWidth = 1080, maxHeight = 1080;
            // 目标尺寸
            let targetWidth = originWidth, targetHeight = originHeight, quality = 1;

            if (originWidth <= maxWidth && originHeight <= maxHeight) {
              // 高宽均小于等于最大尺寸限制
              if (size / 1024 > 500) {
                quality = 0.3;
              }
            } else if (originWidth > maxWidth && originHeight > maxHeight) {
              // 高宽均大于最大尺寸限制
              if (originWidth / originHeight <= 2 || originHeight / originWidth <= 2) {
                // 取大的一边等比压缩至最大尺寸限制
                if (originWidth - originHeight > 0) {
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
              } else if (originWidth / originHeight > 2 || originHeight / originWidth > 2) {
                // 取小的一边等比压缩至最大尺寸限制
                if (originWidth - originHeight > 0) {
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                } else {
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                }
              }
              if (size / 1024 > 500) {
                quality = 0.3;
              }
            } else {
              // 高宽其中之一大于尺寸限制
              if (originWidth / originHeight > 2 || originHeight / originWidth > 2) {
                if (size / 1024 > 500) {
                  quality = 0.3;
                }
              }
            }

            // if (originWidth > maxWidth || originHeight > maxHeight) {
            //   if (originWidth / originHeight > maxWidth / maxHeight) {
            //     // 更宽，按照宽度限定尺寸
            //     targetWidth = maxWidth;
            //     targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            //   } else {
            //     targetHeight = maxHeight;
            //     targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            //   }
            // }
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);

            canvas.toBlob(blob => {
              UploadService.uploadImage(blob, 'default', res => {
                this.currentVal.push(res.data.path);
                this.$emit('input', this.currentVal);
              });
            }, file.type || 'image/png', quality);
          }
        };
      },
      compressImg(file) {
        lrz(file).then(rst => {
          // 上传
          let image = rst.file;
          UploadService.uploadImage(image, 'default', res => {
            this.currentVal.push(res.data.path);
            this.$emit('input', this.currentVal);
          });
          return rst;
        }).catch(err => {
          console.log(err);
        }).always(() => {

        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-upload {
    padding: .3rem .28rem;
    background-color: #f1f1f1;
    &.empty {
      display: block;
      padding: 0;
      height: 2rem;
      line-height: 2rem;
      font-size: .28rem;
      color: #333;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .upload-row {
    margin-top: .4rem;
    display: flex;
    justify-content: space-between;
    &:first-child {
      margin-top: 0;
    }
  }
  .upload-cell {
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    &.main {
      &::before {
        position: absolute;
        content: '主图';
        left: 0;
        right: 0;
        bottom: 0;
        height: .5rem;
        line-height: .5rem;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        z-index: 1;
        background-color: #0f9183;
      }
    }
  }
  .upload-item {
    position: relative;
    padding-top: .8rem;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #dadada;
    font-size: .28rem;
    color: #b3b3b3;
    text-align: center;
    line-height: 1;
    box-sizing: border-box;
    &.img {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    &.add {
      &::before {
        position: absolute;
        content: "";
        top: .31rem;
        left: .51rem;
        width: .38rem;
        height: .38rem;
        background: url('../../../assets/images/upload-plus.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .close {
      position: absolute;
      right: -.1rem;
      top: -.1rem;
      width: .38rem;
      height: .38rem;
      background: url('../../../assets/images/upload-del.png') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
