import { createStore } from 'vuex'

export default createStore({

  // Variables, information here
  state: {
    // Add properties
    cart: {
      items: []
    },
    isAuthenticated: false,
    // Used with login
    token: "",
    // Show loading bar
    isLoading: false,
  },

  // Synchornize variable mutations
  mutations: {
    // function to store things in the local browser
    initializeStore(state) {

      // check if the storage has an item called cart, if not create it
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"))
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }
    },
    // pass in the item you want to add to the cart
    addToCart(state,item) {

      // does the item being added into the cart already exist?
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      // if the item does exist in the cart, increase the quantity by the number provided in the form quantity field. If the item doesnt exist, just add it
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    // Create a loading bar
    setIsLoading(state, status) {
      state.isLoading = status
    }
  },
  // Asynchronous changes to variable mutations
  actions: {
  },

  modules: {
  }
})
