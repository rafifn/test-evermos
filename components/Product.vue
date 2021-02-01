<template>
  <div class="card-product" @click="handleProductClick">
    <div class="card-product__image">
      <img :src="image" class="image" />
      <div v-if="variants.length" class="variants">
        {{ variants.length }} variant
      </div>
    </div>
    <div class="card-product__body">
      <div class="wrapper-title">
        <p class="title" :title="title">{{ title }}</p>
      </div>
      <p class="price">{{ formatCurrency(price) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    productId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    variants: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleProductClick() {
      this.$router.push(`/product/${this.productId}`)
    },
    formatCurrency(price) {
      return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},-`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.card-product {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 20px 0 rgba(27, 27, 27, 0.1);
  transition: all ease 0.3s;
  z-index: 0;
  max-width: calc(100% / 5);
  overflow: hidden;
  @include mqMax(767px) {
    max-width: calc(100% / 2.1);
    margin: 0 1px 10px;
  }
  &:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.2);
  }
  &__image {
    max-height: 170px;
    overflow: hidden;
    .image {
      width: 100%;
      height: auto;
    }
    .variants {
      position: absolute;
      border-radius: 100px;
      background: #ffa800;
      color: #fff;
      font-size: 12px;
      padding: 2px 14px;
      box-shadow: 0 2px 20px 0 rgba(27, 27, 27, 0.1);
      right: 0;
      bottom: 109px;
    }
  }
  &__body {
    padding: 1rem;
    margin-top: auto;
    .wrapper-title {
      max-height: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 1rem;
    }
    .price {
      font-weight: bold;
      margin-bottom: 0;
    }
  }
}
</style>
