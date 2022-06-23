import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    search:"",
    email:"",
    cart:  []
  },
  getters: {
    cart: state => state.cart,
    
    loginInfo(state){
      return state.email
    },
    loginTest(state){
      return state.isLogin
    }

  },
  mutations: {
    loginState(state,{isLogin,email,password}){
      state.isLogin = isLogin
      state.email = email
      state.password = password
    },

    setSearch(state,search){
      state.search = search
    },

    setRegister(state,register){
      state.register = register
    },
    ADD_TO_CART(state, item){
      let productinCart = state.cart.find(mk01=>{
        return mk01.id == item.id;
      });

      if (productinCart){
        productinCart.quantity += 1;
        return;
      }
      state.cart.push({
        ...item,
        quantity:1,
      })

    },
    plus(state,item){
      let productinCart = state.cart.find(mk01=>{
        return mk01.id == item.id;
      });

      if (productinCart){
        productinCart.quantity += 1;
        return;
      }
    },
    min(state,item){
      let productinCart = state.cart.find(mk01=>{
        return mk01.id == item.id;
      });
      
      if(productinCart.quantity<=1){
        state.cart= state.cart.filter((mk01)=>mk01.id != item.id)
        return;
      }
      productinCart.quantity-=1;
    }
  },
  actions: {
    addProductToCart({commit},item){
      commit('ADD_TO_CART',item);
    },
    plus({commit},item){
      commit('plus',item);
    },
    min({commit},item){
      commit('min',item);
    }
  },
  modules: {
  }
})
