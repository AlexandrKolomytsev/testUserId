<template>
  <div>
    <div class="login">
      <img class="login__background-img" src="@/assets/img/Russia_vector.svg" alt="Карта">
      <div class="login__block">
        <div class="login__wrapper">
          <p class="login__text">Вход в систему</p>
          <form action="">
            <div class="text-field">
              <label class="text-field__label">Логин
                <input v-model="login" class="text-field__input" id="login-input" type="text" name="login" placeholder="Login">
              </label>
              <label class="text-field__label">Пароль
                <input v-model="password" class="text-field__input" :type="inputType" id="password-input" name="password" placeholder="Password" autocomplete="on">
                <svg @mousedown="seePassword" @mouseup="hidePassword" class="text-field__input-see">
                  <svg  class="text-field__input-svg" :class="{ 'text-field__input-svg--active' : svgActive===true }" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.228 12.5213L4.94066 12.176L5.46533 10.2167C4.67998 9.92702 3.95008 9.50491 3.30733 8.96867L1.872 10.4047L0.928663 9.46134L2.36466 8.026C1.55405 7.05518 1.00939 5.89051 0.783997 4.646L2.096 4.40667C2.602 7.208 5.05266 9.33334 8 9.33334C10.9467 9.33334 13.398 7.208 13.904 4.40667L15.216 4.64534C14.9909 5.89001 14.4465 7.05491 13.636 8.026L15.0713 9.46134L14.128 10.4047L12.6927 8.96867C12.0499 9.50491 11.32 9.92702 10.5347 10.2167L11.0593 12.1767L9.772 12.5213L9.24666 10.5613C8.42157 10.7027 7.57843 10.7027 6.75333 10.5613L6.228 12.5213Z" fill="inherit"/>
                  </svg>
                </svg>
              </label>
            </div>
            <button @click="authorization" v-on:click.prevent class="login__button">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data () {
    return{
      inputType: 'password',
      svgActive: false,
      login: '',
      password: '',
      isAuth: false,
      listUsers: '',
      userData: {}
    }
  },
  methods: {
    authorization(){
    axios
        .get('http://localhost:3001/users', {
          params: {
            login: this.login,
            password: this.password
          }
        })
        .then((res) => {
          const data = res.data
          if (data.length === 0){
            this.login = ''
            this.password = ''
            alert('Неправильный логин или пароль')
          } else {
            let user = data[0]
            this.userData = {
              role: user.role,
              login: user.login,
              name: user.name,
              lastName: user.lastName,
              position: user.position
            }
            localStorage.setItem('userData', JSON.stringify(this.userData))
            this.isAuth = true
            localStorage.setItem('isAuth', this.isAuth)
            this.$router.replace( {path: '/'} );
            return
          }
        })
    },
    seePassword() {
      this.inputType = 'text'
      this.svgActive = !this.svgActive
    },
    hidePassword(){
      this.inputType = 'password'
      this.svgActive = !this.svgActive
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  position: relative;
  &__background-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 99vh;
    z-index: -1;
  }
  &__block{
    width: 256px;
    height: 318px;
    background-color: #FFFFFF;
    position: relative;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 0px 0px 4px rgba(147, 112, 176, 0.5);
    border-radius: 5px;
  }
  &__wrapper{
    margin: 0 20px;
  }
  &__text{
    padding-top: 30px;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #7A49A3;
  }
  &__button{
    cursor: pointer;
    width: 100%;
    height: 39px;
    background: #7A49A3;
    border-radius: 5px;
    border: transparent;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #FFFFFF;
  }

  .text-field {
    margin: 30px 0;

    &__lable{
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #322633;
    }
    &__input{
      margin-top: 5px;
      &:first-of-type{
        margin-bottom: 20px;
      }
    }
    &__input-see{
      position: absolute;
      top: 34px;
      right: 12px;
      cursor: pointer;
      width: 15px;
    }
    &__input-svg{
      fill: #322633;
    }
    &__input-svg--active{
      fill: #7A49A3;
    }
  }
  /* стили для label */
  .text-field__label {
    position: relative;
    display: block;
    margin-bottom: 0.25rem;
  }
  /* стили для input */
  .text-field__input {
    display: block;
    width: 100%;
    height: 36px;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #F0EEF3;
    background-clip: padding-box;
    border: 1px solid #F0EEF3;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  /* стили для placeholder */
  .text-field__input::placeholder {
    color: #212529;
    opacity: 0.4;
  }
  .text-field__input:focus {
    border-color: transparent;
    outline: 0;
    box-shadow: 0 0 0 0.5px rgba(158, 158, 158, 0.25);
  }
}

</style>
