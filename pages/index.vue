<template>
  <div>
    <the-navbar />
    <section class="hero">
      <div class="container">
        <div class="wrapper-products">
          <Product
            v-for="(product, index) in products"
            :key="index"
            :product_id="product.id"
            :title="product.title"
            :image="product.image"
            :price="product.price"
            :variants="product.variants"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Product from '~/components/Product.vue'

export default {
  components: { Product },
  computed: {
    ...mapState(['products']),
    products: {
      get() {
        return this.$store.getters.getProducts
      },
    },
  },
  beforeMount() {
    this.getProducts()
  },
  methods: {
    ...mapActions(['getProducts']),
  },
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  .wrapper-products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
