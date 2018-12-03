<template>
  <div class="nest-upload" v-if="finalMediaArr.length > 0">
    <div class="upload-row" v-for="(rowNum, rowIndex) in Math.ceil((finalMediaArr.length + 1) / 4)">
      <div class="upload-cell" v-for="(cellNum, cellIndex) in 4">
        <div class="upload-item img"
             v-if="rowIndex * 4 + cellIndex < finalMediaArr.length"
             :style="{ backgroundImage: 'url(' + mediaInCell(rowIndex, cellIndex) + ')' }">
          <span class="close" @click="deleteImg(rowIndex, cellIndex)"></span>
        </div>
        <label class="upload-item add" v-else-if="rowIndex * 4 + cellIndex === finalMediaArr.length">
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
  import canvasResize from 'canvas-resize';

  export default {
    name: "nest-upload",
    props: {
      mediaSrcArr: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    computed: {
      finalMediaArr() {
        return this.mediaSrcArr;
      }
    },
    methods: {
      mediaInCell(rowIndex, cellIndex) {
        let mediaIndex = rowIndex * 4 + cellIndex;
        return this.finalMediaArr[mediaIndex];
      },
      deleteImg(rowIndex, cellIndex) {
        let mediaIndex = rowIndex * 4 + cellIndex;
        this.finalMediaArr.splice(mediaIndex, 1);
      },
      selectMedia(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        Object.keys(files).forEach((key) => {
          let file = files[key];
          this.compressImg(file);
        })
      },
      compressImg(file) {
        //todo 尺寸压缩，质量压缩
        canvasResize(file, {
          crop: false,
          quality: 0.9,
          rotate: 0,
          callback: baseStr => {
            this.finalMediaArr.push(baseStr);
          }
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
    width: 1.4rem;
    height: 1.4rem;
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
