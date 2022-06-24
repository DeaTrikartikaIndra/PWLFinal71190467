<template>
<v-content>
<v-container>
  <v-card
    class="vue-template"
  >
    <v-toolbar
      flat
      color="white"
     
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Login
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        color="white"
        v-model=email
        label="Email"
      ></v-text-field>
      <v-text-field
        color="white"
        label="Password"
        v-model=password
        :type="showPassword ? 'text' : 'Password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="login"
        color ="blue"
      >
        Login
      </v-btn>
    </v-card-actions>

  </v-card>
  
  <div  class="mx-auto my-12">Don't have account?</div>
  <div><router-link to="/register">Register here</router-link></div>
  </v-container>
  </v-content>
</template>

<script>

import firebase from 'firebase/compat/app'


 export default {
  name: 'Login',
    data()
    {
      return{
        step:1,
        email: "",
        password: "",
      }
    },
    props: {
    source: String
  },
    methods: {
      login(){
        firebase.auth()
        .signInWithEmailAndPassword(this.email,this.password)
        .then((user)=>{
          var isLogin = true
          var email = this.email
          var password = this.password
          alert(user+'Login Succesfull')
          localStorage.setItem("email",this.email)
          localStorage.setItem("password",this.password)
          this.$store.commit("loginState",{isLogin,email,password})
          this.email = ""
          this.password =""
          this.$router.push('/')
        })
        .catch((e)=>{
          alert('Login Failed'+e.message)
        })
      },
      
    },

 }
</script>