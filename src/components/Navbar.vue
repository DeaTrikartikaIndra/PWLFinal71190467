<template>
  <!-- <v-toolbar
    white
    color="white"
  >
    <v-toolbar-title><router-link to="/">
      <v-img
        src = 'https://firebasestorage.googleapis.com/v0/b/pwlfinal71190467.appspot.com/o/Deapedia-removebg-preview.png?alt=media&token=02912018-4b32-4af6-b76b-3a62a42ae9b4'
        height = 150
        width = 150>
        </v-img>
    </router-link></v-toolbar-title>
        
    <v-autocomplete

      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="What are you looking for?"
      solo-inverted
    ></v-autocomplete>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <router-link to="/login">Login</router-link>
  </v-toolbar> -->
</template>

<script>
// import { db } from '../db'
//   export default {
//     data () {
//       return {
//         loading: false,
//         items: [],
//         search: '',
//         select: '',
//         mk01: [],
//       }
//     },    
//     watch: {
//       search (val) {
//         val && val !== this.select && this.querySelections(val)
//       },
//     },
//     methods: {
//       querySelections (v) {
//         this.loading = true
//         // Simulated ajax query
//         setTimeout(() => {
//           this.items = this.mk01.filter(e => {
//             return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
//           })
//           this.loading = false
//         }, 500)
//       },
      
//     },
//     created(){
//       db.collection("mk01")
//                     .get()
//                     .then((querySnapshot) => {
//                         const documents = querySnapshot.docs.map((doc) => doc.data().nama);
//                         this.mk01 = documents;
//                     });
//     },
//   }
</script>