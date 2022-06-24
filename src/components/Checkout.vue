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
    solo rounded v-model=cari></v-text-field>
    <v-btn icon v-on:click="search"><v-icon>mdi-magnify</v-icon>
    </v-btn>
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

<v-content>
<v-container>
    <div class="mx-auto my-12">
  <v-card
    class="overflow-hidden-center"
  >
    <v-toolbar
      flat
      color="white"
    >
      <v-icon>mdi-bike-fast</v-icon>
      <v-toolbar-title class="font-weight-light">
        Pengiriman
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        color="black"
        v-model= penerima
        label="Nama Penerima"
      ></v-text-field>
      <v-text-field
        color="black"
        v-model= alamat
        label="Alamat"
      ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
    </div>
  <div class="mx-auto my-12">
    <h2 class="d-flex">Summary</h2>
  </div>
  
    <div class="d-flex">
    </div>
    <v-row >
      <v-col
        cols="12"
        sm="3"
        v-for="item in cart" :key="item.id"
      >
      <v-list-item>
        <v-list-item-avatar size = "150" tile>
          <v-img 
          :src="item.link"></v-img>
        </v-list-item-avatar>
    </v-list-item>
        
       <v-list-item class="d-flex"> {{item.nama}}</v-list-item>
        <v-list-item><h4>Rp{{(item.harga * item.quantity).toLocaleString("id-ID")}}</h4></v-list-item>
      </v-col>
      </v-row>
  <v-expansion-panels
      
      
    >
    

    </v-expansion-panels>
    <h3 class="mx-auto my-12">Jumlah bayar : Rp {{(total).toLocaleString("id-ID")}}</h3> 
        <v-list-item-title></v-list-item-title>
    <v-btn
      
      color="primary"
      v-on:click="ordernow(cart)"
    >
      Order Now
    </v-btn>
  </v-container>
  </v-content>
  </v-app>
</template>

<script>
import { db } from '../db'
import { mapActions, mapGetters } from 'vuex';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

 export default {
  name: 'Checkout',
    data: () => ({
      panel: [],
      disabled: false,
      readonly: false,
      mk01: [],
      penerima:'',
      alamat:'',
      show: true,
      loading: false,
    }),

    created(){
      db.collection("mk01")
                    .get()
                    .then((querySnapshot) => {
                        const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                        this.mk01 = documents;
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
        },

      )
      }
     },
     computed:{
        ...mapGetters(["cart"]),
        total(){
          return this.cart.reduce((a,b)=>a+b.quantity * b.harga,0);
        },
    },
    methods: {
      ...mapActions(["addProductToCart"]),
      checkout(){
        this.$router.push('/checkout')
      },
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
    ordernow(cart){
            console.log(cart)

            var docData = {
                penerima: this.penerima,
                alamat: this.alamat,
                // date: firebase.firestore.Timestamp.now(),
                cart: cart,
                total:this.total
            };
            db.collection("invoice").doc().set(docData).then(() => {
                alert("Shipping are success!");
            });
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
    },

 }
</script>
