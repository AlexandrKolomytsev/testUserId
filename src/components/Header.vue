<template>
  <div class="nav">
    <div class="nav__wrapper">
      <nav class="header container">
        <div class="nav__items">
          <div class="nav__item">
            <a href="">
              <img src="@/assets/img/logo.png" alt="Лого">
            </a>
          </div>
          <div class="nav__item">
            <a href="">Главная</a>
              <router-link to="/login"><span @click="logOut">Выйти</span></router-link>
          </div>
          <div class="nav__item">
            <header-tab />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import HeaderTab from "./HeaderTab";
export default {
  name: "Header",
  components: {HeaderTab},
  methods: {
    logOut(){
      localStorage.removeItem('userData')
      localStorage.removeItem('isAuth')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: #FFFFFF;
 &__items{
   display: flex;
   align-items: center;
   height: 70px;
   gap: 35px;
  }
  &__item{
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #7A49A3;
    display: flex;
    gap: 20px;
    &:last-of-type{
      margin-left: auto;
    }
  }
}
</style>
