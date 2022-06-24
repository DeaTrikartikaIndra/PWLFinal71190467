<template>

  <v-app>
    <v-toolbar
    white
    color="blue lighten-4"
  >
    <v-toolbar-title><router-link to="/">
      <v-img
        src = 'https://firebasestorage.googleapis.com/v0/b/pwlfinal71190467.appspot.com/o/Deapedia-removebg-preview.png?alt=media&token=02912018-4b32-4af6-b76b-3a62a42ae9b4'
        height = 100
        width = 100>
        </v-img>
    </router-link></v-toolbar-title>
    <v-text-field label="Search" class="pt-8 pl-2 d-none d-sm-flex"
    solo rounded v-model="cari"></v-text-field>
    <v-btn icon color="black"><v-icon>mdi-magnify</v-icon></v-btn>

    <v-btn icon>
      <router-link to="/cart">
        <v-badge color ="blue" :content="cartItemCount()"><v-icon>mdi-cart-variant</v-icon></v-badge>
      </router-link>
    </v-btn>
        <div v-show="this.$store.getters.loginTest">
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{on,attrs}">
            <v-btn icon v-bind="attrs" v-on="on" color="white">
              <router-link to="/login"><v-icon>mdi-account</v-icon></router-link>
            </v-btn>
        </template>
        <v-card>
          <v-card-text>Login as:</v-card-text>
          <v-card-text>{{this.$store.getters.loginInfo}}</v-card-text>
          <v-card-action>
            <v-btn block @click ="logout" color = "light-blue lighten-4">
              logout
            </v-btn>
          </v-card-action>
        </v-card>
      </v-menu>
    </div>
    <v-btn v-show="!this.$store.getters.loginTest" icon>
      <router-link to="/login"><v-icon>mdi-account</v-icon></router-link>
    </v-btn>
  </v-toolbar>
  
  <v-container>
    <v-row >
      <v-col
        cols="12"
        sm="3"
        v-for="item in filteredMk" 
    :key="item.id"
      >
      <v-img
      height="250"
      :src= item.link
    ></v-img>

      <v-list-item-title>{{item.nama}}</v-list-item-title>

    <v-card-subtitle>
      <v-row
      align="center"
        class="mx-0">
        
      </v-row>

      <v-row
        align="center"
        class="mx-0"
      >
      
        <v-rating
          :value=item.rating
          color="blue"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="d-flex">
          {{item.rating}} {{(item.pembeli)}}
        </div>
        <v-list-item><div class="d-flex"><h3>Rp{{(item.harga).toLocaleString("id-ID")}}</h3></div></v-list-item>
      </v-row>

    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="blue"
        text
        @click="addProductToCart(item,1)"
      >
        ADD TO CHART
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
         {{item.deskripsi}}
        </v-card-text>
      </div>
    </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
import { db } from '../db'
import { mapActions } from 'vuex';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

export default {
  name: 'search',
  data ()  { 
    return {
      items: [],
      cari: this.$store.state.search,
      show: false,
      loading: false,

  }
  },
  // watch: {
  //     search (val) {
  //       val && val !== this.select && this.querySelections(val)
  //     },
  //   },
  methods: {
    cartItemCount(){
      try{
        if(this.$store.getters.cart.length<1){
          return "0";
        }else{
          return this.$store.getters.cart.length;
        }
      }catch(err){
        return 0;
      }
    },
    logout(){
        firebase.auth()
        .signOut()
        .then((user)=>{
          alert(user+'Logout Succesfull')
          localStorage.removeItem("email")
          localStorage.removeItem("password")
          var isLogin = !this.$store.state.isLogin
          var email=""
          var password = ""
          this.$store.commit("loginState",{isLogin,email,password})
          this.$router.push('/')
        })
        .catch((e)=>{
          alert('Login Failed'+e.message)
        })
        },
      ...mapActions(['addProductToCart'])
      
    },

  created(){
  db.collection("mk01")
                    .get()
                    .then((querySnapshot) => {
                        const documents = querySnapshot.docs.map((doc) => doc.data());
                        this.items = documents;
                    });

    if(localStorage.getItem("email") && localStorage.getItem("password")){
      var emailLocal = localStorage.getItem("email")
      var passwordLocal = localStorage.getItem("password")
      firebase.auth().signInWithEmailAndPassword(emailLocal, passwordLocal)
        .then(() => {
            var isLogin = true
            var email = emailLocal
            var password = passwordLocal
            localStorage.setItem("email",email)
            localStorage.setItem("password",password)
            this.$store.commit("loginState",{isLogin,email,password})
        },)
      }
  },   
    computed:{
    filteredMk: function(){
      return this.items.filter((item)=>{
        if((item.nama).toLowerCase().match(this.cari.toLowerCase())){
            return (item.nama).toLowerCase().match(this.cari.toLowerCase())
        }
      });
    }
  },
  }

</script>