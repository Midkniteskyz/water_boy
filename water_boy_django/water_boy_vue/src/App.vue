<template>
  <!-- Wrapper for all content -->
  <div id="wrapper">

    <!-- Bulma class. Gives menu at the top with a dark theme. -->
    <nav class="navbar is-dark">

      <!-- Logo -->
      <div class="navbar-brand">

        <!-- Logo link to the homepage -->
        <router-link to="/" class="navbar-item"><strong>Water Boy</strong></router-link>

        <!-- Hamburger style menu for small devices. Navbar-Menu shows when this icon is clicked. -->
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

        <!-- Connects to menu in line 14. V-Bind is active is showMobileMenu is True-->
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="Thirsty? Search Here..." name="query">
                </div>

                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Seperate the menu on one side of the page with logo on the otherside -->
        <div class="navbar-end">

          <!-- Categories of water -->
          <router-link to="/domestic" class="navbar-item">Domestic</router-link>
          <router-link to="/import" class="navbar-item">Import</router-link>
          
          <!-- Shopping Cart & Log in buttons -->
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light">Log In</router-link>

              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart ({{ cartTotalLength }})</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Loading bar -->
    <!-- if the store state is truly loading, then the class that is bound with vue will run. -->
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>

    <!-- Create space between the menu top and the main content with a section. Router view is where all of the content is placed-->
    <section class="section">
      <router-view/>
    </section>

    <!-- Boilerplate footer -->
    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>

  </div>
</template>

<script>
export default {
  data() {
    return{
      showMobileMenu: false,
        cart: {
        items: []
      }
    }
  },
  // lifecycle hook that starts before the page is created. 
  beforeCreate() {
    // commit is used to call the mutations
    this.$store.commit("initializeStore")
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  // calculated variables based on things around the whole page
  computed: {
    cartTotalLength() {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma";

.lds-dual-ring{
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after{
  content: "";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transistion: all 0.3s;
  transition: all 0.3s;

  &.is-loading{
    height:80px;
  }
}
</style>
