<template>
<v-content>
<v-container>
  <v-card
    class="overflow-hidden-center"
  >
    <v-toolbar
      flat
      color="white"
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Register
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        color="white"
        v-model="email"
        label="Email"
      ></v-text-field>
      <v-text-field
        color="white"
        label="Password"
        v-model="password"
        :type="showPassword ? 'text' : 'Password'"
        @click:append="showPassword = !showPassword"
        
      ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-on:click="register" >Register</v-btn>
    </v-card-actions>
  </v-card>
  <div class="mx-auto my-12">Have account?</div>
  <div><router-link to="/login">Login here</router-link></div>
  </v-container>
  </v-content>
</template>

<script>
// import firebase from 'firebase'
// import firebase from 'firebase/compat/app'
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

 export default {
    name: 'Register',
    data()
    {
        return{
            showPaasword:false,
            step :1,
            email:'',
            password:'',
        }
    },
    props:{
        source:String
    },
    methods: {
    register() {
    firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        alert(user+'Successfully registered! Please login.');
        this.$router.push('/login');
      })
      .catch(error => {
        alert(error.message);
      });
  },
},
    
    
 }
</script>
