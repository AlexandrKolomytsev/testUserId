<template>
  <div>
    <div class="button-block" :class="{'disable-button': disableButton}">
      <button @click="getTodos" class="button">Загрузить данные</button>
      <img src="@/assets/img/loading.gif" class="preloader" alt="Фото пользоавтеля">
    </div>
    <div class="container">
      <div v-for="(mas, index) in masGroup" :key="index" class="todos-wrapper">
        <p class="name">Пользователь: {{ mas[0].userId }}</p>
        <ul class="todos">
          <li v-for="item in mas" :key="item.id" v-show="item.title" class="todo">
            {{ item.title }}
          </li>
        </ul>
        <div class="todos-counter">
          <span class="completed">{{ mas[mas.length - 1].completedCount }}</span> / <span
            class="not-completed">{{ mas[mas.length - 1].notCompletedCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "todosBlock",
  data() {
    return {
      masGroup: [],
      disableButton: false
    }
  },
  methods: {
    sortUserId(mas, prop) {
      let result = mas.sort(function (a, b) {
        if (a[prop] < b[prop]) return -1
      })
      return result
    },
    sortUsers(mas) {
      let result = mas.sort(function (a, b) {
        if (a[a.length - 1].completedCount < b[a.length - 1].completedCount) return -1
      })
      return result
    },
    getTodos() {
      if (this.disableButton === true) return
      this.disableButton = true
      axios
          .get('https://jsonplaceholder.typicode.com/todos')
          .then((res) => {
            const data = res.data
            this.sortUserId(data, 'userId') //сортируем полученные с сервера данные по userId
            const masGroup = []
            let masWrapper = []
            let completedCount = 0
            const completedWrapper = []
            let curUserId = data[0].userId
            data.forEach(function (item, i) {
              if (item.userId === curUserId) {
                masWrapper.push(item)
                if (item.completed === true) {
                  completedCount = completedCount + 1
                }
              }
              if (item.userId !== curUserId || i === data.length - 1) {
                curUserId = data[i].userId
                let completeds = {
                  'completedCount': completedCount,
                  'notCompletedCount': masWrapper.length - completedCount
                }
                completedWrapper.push(completeds)
                completedCount = 0
                if (item.completed === true) {
                  completedCount = completedCount + 1
                }
                masGroup.push(masWrapper)
                masWrapper = []
                masWrapper.push(item)
              }
            })
            // добавим вычисленные complited в массив
            masGroup.forEach(function (item, i) {
              item.push(completedWrapper[i])
            })
            this.masGroup = masGroup
            // сортируем получившийся массив по добавленному complited
            this.sortUsers(this.masGroup)
            this.disableButton = false
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: auto;
  & .todos-wrapper {
    position: relative;
    width: 270px;
    height: 300px;
    overflow-y: auto;
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    margin: 20px;
    padding: 5px 0 5px 25px;
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-button:vertical {
      width: auto;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(132, 142, 150, 0.6);
      border-radius: 3px;
      height: 3px;
      width: auto;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(51, 52, 54, 1);
    }
    & .name {
      font-size: 20px;
      margin-bottom: 10px;
    }
    & .todos {
      & .todo {
        list-style: inherit;
        font-size: 14px;
      }
    }
    & .todos-counter {
      position: absolute;
      top: 7px;
      right: 7px;
      & .completed {
        color: green;
        font-size: 20px;
      }
      & .not-completed {
        color: red;
        font-size: 20px;
      }
    }
  }
}
.button-block{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  & .preloader{
    display: none;
  }
  & .button {
    cursor: pointer;
    border: 0;
    background: #7BAE73;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #FFFFFF;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 10px;
  }
}
.disable-button {
  & .button{
    background: #EEEEEE;
    cursor: default;
    color: #B4B4B4;
  }
  & .preloader{
    display: block!important;
  }
}
</style>
