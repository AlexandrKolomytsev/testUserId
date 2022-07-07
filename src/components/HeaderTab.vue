<template>
  <div>
    <div class="profile-nav">
      <div class="profile-nav__container">
        <p class="profile-nav__position">{{userData.position}}</p>
        <div @click="isOpen" :class="{'is-open': open}" class="profile-nav__name">{{userData.name}}
          <div class="profile-nav__info-block">
            <ul>
              <li>Логин: {{userData.login}}</li>
              <li>Фамилия: {{userData.lastName}}</li>
              <li>Роль: {{userData.role}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav__profile-photo">
        <img src="@/assets/img/user-photo.svg" alt="Фото пользоавтеля">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTab",
  data(){
    return{
      userData: {},
      open: false
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate(){
      let raw = localStorage.getItem('userData')
      this.userData = JSON.parse(raw)
    },
    isOpen(){
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped>
.is-open{
  & .profile-nav__info-block{
    display: block;
  }
}
.profile-nav{
  display: flex;
  gap: 25px;
  &__name{
    margin: 5px 11px 0 0;
    position: relative;
    text-align: right;
    cursor: pointer;
    &:after{
      content: "";
      position: absolute;
      top: 5px;
      right: -14px;
      display: block;
      width: 5px;
      height: 5px;
      border-top: 2px solid #322633;
      border-right: 2px solid #322633;
      transform: rotate(135deg);
    }
  }
  &__info-block{
    position: absolute;
    top: 26px;
    right: -20px;
    width: 150px;
    background-color: #F6F5F8;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #7A49A3;
    display: none;
    z-index: 2;
  }
}
</style>
