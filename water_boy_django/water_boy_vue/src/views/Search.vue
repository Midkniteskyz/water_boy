<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>

                <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
            </div>

            <ProductBox
                v-for="product in latestProducts"
                v-bind:key="product.id"
                v-bind:product="product"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios"
import ProductBox from "@/components/ProductBox.vue"

export default {
    name: "Search",
    components: {
        ProductBox
    },
    data(){
        return {
            products: [],
            query: ""
        }
    },
    mounted() {
        document.title = "Search | Water Boy"

        // get information from the url
        let uri = window.location.search.substring(1)

        //grab each of the parameters based off the url
        let params = new URLSearchParams(uri)

        // Get the information from the query
        if (params.get("query")) {
            this.query = params.get("query")

            this.performSearch()
        }
    },
    methods: {
        async performSearch () {
            this.$store.commit("setIsLoading", true)

            await axios
                .port("http://127.0.0.1:8000/api/v1/products/search/", {"query": this.query})
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                
            this.$store.commit("setIsLoading", true)
        }
    }

}
</script>