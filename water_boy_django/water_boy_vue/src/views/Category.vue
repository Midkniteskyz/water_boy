<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered"> {{ category.name }}</h2>
            </div>

            <ProductBox
            v-for="product in category.products"
            v-bind:key="product.id"
            v-bind:product="product"
            />

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from "bulma-toast"

import ProductBox from "@/components/ProductBox"

export default {
    name: "Category",
    components: {
        ProductBox
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    // watch for changes to the route. recall the getcategory function if the route changes to refresh with new products.
    watch: {
        $route(to, from) {
            if (to.name === "Category") {
                this.getCategory()
            }
        }
    },
    methods: {
        // make a method to grab information from the back end
        
        async getCategory() {
            // set the slug for the category, taken from the route parameter
            const categorySlug = this.$route.params.category_slug

            // Set to async to use the loading bar
            this.$store.commit("setIsLoading", true)

            axios
                .get(`http://127.0.0.1:8000/api/v1/products/${categorySlug}/`)
                .then(response => {
                    // get the category and also the products
                    this.category = response.data
                    
                    document.title = this.category.name + " | Water Boy"
                })
                .catch(error => {
                    console.log(error)

                    // show the toast error message to the user.
                    toast({
                        message: "Something went wrong. Please try again",
                        type: "is-danger",
                        dismissable: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: "bottom-right",
                    })
                })
        }
        
        
    }
}
</script>