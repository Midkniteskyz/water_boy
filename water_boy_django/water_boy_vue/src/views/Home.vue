<template>
  <div class="home">

    <!-- START Header -->
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Water Boy
        </p>
        <p class="subtitle">
          Water is Life
        </p>
      </div>
    </section>
    <!-- END Header -->

    <!-- START List of products -->
    <!-- Multiline to list the products and prices -->
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>

    <ProductBox
      v-for="product in latestProducts"
      v-bind:key="product.id"
      v-bind:product="product"
    />
      <!-- Vue for-loop to cycle through products. Vue expects each item to be unique, therefore v-bind must be added.
      <div 
        class="column is-3" 
        v-for="product in latestProducts" 
        v-bind:key="product.id"
      >
        <div class="box">
          <figure class="image mb-4">

            Use v-bind to display the img given the URL
            <img v-bind:src="product.get_thumbnail">
          </figure>

          Show the product name and price.
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>

          <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View Details </router-link>
        </div>
      </div> -->
    </div>
    <!-- END List of products -->

  </div>
</template>

<script>
// Axios function to import the DB items into the Vue app
import axios from 'axios'

// @ symbol is a shortcut to reference the root folder.
import ProductBox from "@/components/ProductBox"

export default {
  name: 'Home',
  data() {
    return {
      // Create an empty list of latest products
      latestProducts: []
      }
  },
  components: {
    ProductBox
  },
  // (lifecycle hook) When the page is finished, call code below
  mounted() {
    this.getLatestProducts()
    document.title = "Home | Water Boy"
  },
  methods: {
    // method (function) that is used for the mounted call on line 64
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true)

      await axios
      .get(`/api/v1/latest-products/`)
      .then(response => {
        // Get the latest products object and use that as the response to return to Vue.
        this.latestProducts = response.data
      })
      .catch(error => {
        console.log(error)
      })

      this.$store.commit("setIsLoading", false)
    }
  }
}
</script>


