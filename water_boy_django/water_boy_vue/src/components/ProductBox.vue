<template>
    <!-- Vue for-loop to cycle through products. Vue expects each item to be unique, therefore v-bind must be added. -->
      <div class="column is-3">
        <div class="box">
          <figure class="image mb-4">

            <!-- Use v-bind to display the img given the URL -->
            <img v-bind:src="product.get_thumbnail">
          </figure>

          <!-- Show the product name and price. -->
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>

          <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View Details </router-link>
        </div>
      </div>
</template>

<script>
export default {
    name: "ProductBox",
    props: {
        product: Object
    }
}
</script>

<style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style>