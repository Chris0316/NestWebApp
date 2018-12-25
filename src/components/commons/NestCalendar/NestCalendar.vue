<template>
  <div class="nest-calendar">
    <div class="calendar-control border-bottom">
      <div class="control-group">
        <div class="cell left" @click="fullYear--;"></div>
        <div class="cell">{{ fullYear }}</div>
        <div class="cell right" @click="fullYear++;"></div>
      </div>
      <div class="control-group">
        <div class="cell left" @click="prevMonth"></div>
        <div class="cell">{{ monthIndex + 1 }}</div>
        <div class="cell right" @click="nextMonth"></div>
      </div>
    </div>
    <ul class="calendar-th border-bottom">
      <li class="calendar-cell">日</li>
      <li class="calendar-cell">一</li>
      <li class="calendar-cell">二</li>
      <li class="calendar-cell">三</li>
      <li class="calendar-cell">四</li>
      <li class="calendar-cell">五</li>
      <li class="calendar-cell">六</li>
    </ul>
    <ul class="calendar-tr">
      <li class="calendar-cell"
          :class="[{ 'disabled': item.monthType !== 'current' }, getDatesClass(item)]"
          v-for="item in options"
          @click="selectDate(item)">
        {{ item.date.getDate() }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "nest-calendar",
    data() {
      const value = Array.isArray(this.value) ? this.value : (this.value ? [this.value] : []);
      return {
        fullYear: value.length === 0 ? new Date().getFullYear() : value[0].getFullYear(),
        monthIndex: value.length === 0 ? new Date().getMonth() : value[0].getMonth(),
        options: [],
        currentVal: value
      }
    },
    props: {
      /**
       * v-model绑定时无论是否是范围取值都需要传入数组
       * */
      value: {
        type: Array
      },
      range: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.options = this.render();
    },
    computed: {
      /**
       * 当月天数
       * */
      currentMonthOfDays() {
        return this.daysInTargetMonth(this.fullYear, this.monthIndex);
      },
      /**
       * 上月天数
       * */
      prevMonthOfDays() {
        let year = this.fullYear;
        let monthIndex = this.monthIndex - 1;
        if (monthIndex < 0) {
          year--;
          monthIndex = 11;
        }
        return this.daysInTargetMonth(year, monthIndex);
      },
      /**
       * 指定月份1号是星期几
       * */
      dayOfCurrentMonth() {
        return new Date(this.fullYear, this.monthIndex, 1).getDay();
      }
    },
    watch: {
      fullYear() {
        this.options = this.render();
      },
      monthIndex() {
        this.options = this.render();
      }
    },
    methods: {
      daysInTargetMonth(year, monthIndex) {
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          daysInMonth[1] = 29;
        }
        return daysInMonth[monthIndex];
      },
      /**
       * 渲染日历
       * */
      render() {
        let daysArr = [],
          date = null,
          nextMonthOfDays = 0;
        for (let i = 1; i <= this.dayOfCurrentMonth; i++) {
          date = this.getFullDate(this.fullYear, this.monthIndex - 1, this.prevMonthOfDays - this.dayOfCurrentMonth + i);
          daysArr.push({
            monthType: 'prev',
            date: date
          });
        }
        for (let j = 1; j <= 42 - this.dayOfCurrentMonth; j++) {
          if (j > this.currentMonthOfDays) {
            nextMonthOfDays++;
            date = this.getFullDate(this.fullYear, this.monthIndex + 1, nextMonthOfDays);
            daysArr.push({
              monthType: 'next',
              date: date
            });
          } else {
            date = this.getFullDate(this.fullYear, this.monthIndex, j);
            daysArr.push({
              monthType: 'current',
              date: date
            });
          }
        }
        return daysArr;
      },
      getFullDate(year, monthIndex, date) {
        if (monthIndex < 0) {
          year--;
          monthIndex = 11;
        } else if (monthIndex > 11) {
          year++;
          monthIndex = 0;
        }
        return new Date(year, monthIndex, date);
      },
      prevMonth() {
        if (this.monthIndex === 0) {
          this.monthIndex = 11;
          this.fullYear--;
        } else {
          this.monthIndex--;
        }
      },
      nextMonth() {
        if (this.monthIndex === 11) {
          this.monthIndex = 0;
          this.fullYear++;
        } else {
          this.monthIndex++;
        }
      },
      /**
       * 渲染日历状态
       * @param item 当前月份日历每一天
       * */
      getDatesClass(item) {
        let className = '',
          date = item.date;
        if (this.currentVal.length === 1 && date.getTime() === this.currentVal[0].getTime()) {
          className = 'active';
        } else if (this.currentVal.length === 2) {
          if (date.getTime() === this.currentVal[0].getTime() || date.getTime() === this.currentVal[1].getTime()) {
            className = 'active';
          } else if (date.getTime() > this.currentVal[0].getTime() && date.getTime() < this.currentVal[1].getTime()) {
            className = 'active-range';
          }
        }
        return className;
      },
      /**
       * 选中日历状态
       * @param item 当前月份日历每一天
       * */
      selectDate(item) {
        if (!this.range) {
          this.currentVal = [item.date];
          this.$emit('input', this.currentVal);
        } else {
          if (this.currentVal.length === 2 || this.currentVal.length === 0) {
            this.currentVal = [];
            this.currentVal.push(item.date);
          } else if (this.currentVal.length === 1) {
            if (item.date.getTime() <= this.currentVal[0].getTime()) {
              this.currentVal = [item.date];
            } else {
              this.currentVal.push(item.date);
              this.$emit('input', this.currentVal);
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-calendar {
    padding-bottom: .4rem;
    .calendar-control {
      padding: 0 .4rem .3rem;
      display: flex;
      justify-content: space-between;
      .control-group {
        width: 2.2rem;
        display: flex;
        font-size: .28rem;
        color: #333;
      }
      .cell {
        flex: 1;
        text-align: center;
        &.left {
          background: url('../../../assets/images/calendar-left.png') no-repeat left center;
          background-size: .17rem .3rem;
        }
        &.right {
          background: url('../../../assets/images/calendar-right.png') no-repeat right center;
          background-size: .17rem .3rem;
        }
      }
    }
    .calendar-th, .calendar-tr {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: .24rem;
      color: #333;
    }
    .calendar-th {
      .calendar-cell {
        margin-top: 0;
      }
    }
    .calendar-cell {
      margin: .2rem .19rem 0;
      flex: 0 0 .6rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      border-radius: .6rem;
      &.disabled {
        color: #b3b3b3;
      }
      &.active {
        background-color: #0f9183;
        color: #fff;
      }
      &.active-range {
        background-color: #ADD9D5;
        color: #fff;
      }
    }
  }
</style>
