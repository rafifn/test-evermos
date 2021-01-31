<template>
  <div>
    <the-navbar is-detail />
    <section class="hero detail">
      <div class="container">
        <div class="detail__product">
          <div class="detail__product__image">
            <img :src="product.image" />
          </div>
          <div class="detail__product__center">
            <div class="mb-3 d-flex flex-wrap">
              <h1 v-if="hasVariant">
                {{ product.title }} - {{ selectedVariant }}
              </h1>
              <h1 v-else>{{ product.title }}</h1>
            </div>
            <div class="mb-3">
              <h2>{{ formatCurrency(product.price) }}</h2>
            </div>
            <div class="mb-3">
              <span>Terjual :</span>
              <span class="fw-bold">{{ product.sold }}</span>
            </div>
            <div class="mb-3">
              <span>Kategori :</span>
              <span class="fw-bold">{{ product.category }}</span>
            </div>
          </div>
          <div class="detail__product__right">
            <div class="wrapper-seller">
              <div class="seller">
                <div>
                  Penjual
                  <span class="fw-bold">{{ product.seller.name }}</span>
                </div>
                <div>
                  <span class="fw-bold">{{ product.seller.trust }}</span>
                  Terpercaya
                </div>
              </div>
            </div>
            <div v-if="hasVariant" class="wrapper-variants">
              <p class="fw-bold">Pilih Varian</p>
              <select v-model="selectedVariant">
                <option
                  v-for="(variant, index) in product.variants"
                  :key="index"
                >
                  {{ variant }}
                </option>
              </select>
            </div>
            <div class="wrapper-button">
              <button class="primary" @click="addToCart">
                Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="detail">
      <div class="container">
        <div class="divider"></div>
        <div class="detail__description">
          <h3>Deskripsi :</h3>
          <div class="description__content">
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheNavbar from '~/components/TheNavbar.vue'

export default {
  components: { TheNavbar },
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`products/${params.product}`)
    return {
      product: response.data,
    }
  },
  data() {
    return {
      selectedVariant: '',
      hasVariant: false,
    }
  },
  mounted() {
    if (this.product.variants.length) {
      this.hasVariant = true
      this.selectedVariant = this.product.variants[0]
    }
  },
  methods: {
    addToCart() {
      const item = {}
      item.id = this.product.id
      item.title = this.product.title
      item.image = this.product.image
      item.price = this.product.price
      item.total = 1
      this.$store.commit('updateIncrementCart', item)
    },
    formatCurrency(price) {
      return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},-`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.detail {
  &__product {
    display: grid;
    grid-template-columns: minmax(0px, 240px) minmax(0px, 360px) minmax(
        0px,
        268px
      );
    grid-gap: 32px;
    @include mqMax(767px) {
      grid-gap: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    &__image {
      img {
        width: 100%;
        height: auto;
      }
    }
    &__right {
      display: grid;
      grid-gap: 1rem;
      .wrapper-seller {
        .seller {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  &__description {
    .description__content {
      padding: 1rem;
      min-height: 480px;
    }
  }
}
</style>
