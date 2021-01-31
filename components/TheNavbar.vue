<template>
  <div class="wrapper-navbar">
    <div class="container">
      <nav class="navbar">
        <div class="navbar__left">
          <nuxt-link v-if="isDetail" to="/" class="navbar-brand mr-3"
            ><i class="fa fa-arrow-left"></i
          ></nuxt-link>
          <span class="navbar-brand">{{ title }}</span>
        </div>
        <div class="navbar__right">
          <div class="cart" @click="showCartItem = !showCartItem">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge">{{ cartTotal }}</span>
            <transition name="fade">
              <div v-if="showCartItem" class="wrapper-item">
                <div
                  v-for="(item, index) in cartItems"
                  :key="index"
                  :title="item.title"
                  class="item"
                >
                  <div class="child">
                    <div class="d-flex align-items-center">
                      <div class="item-image">
                        <img :src="item.image" />
                      </div>
                      <div>
                        <div class="item-title">
                          <small>{{ item.title }}</small>
                        </div>
                        <div class="item-total">
                          <small>{{ item.total }} barang</small>
                        </div>
                      </div>
                    </div>
                    <div class="item-price">
                      <small>{{ formatCurrency(item.price) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheNavbar',
  props: {
    title: {
      type: String,
      default: 'Evermos',
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showCartItem: false,
    }
  },
  computed: {
    ...mapState(['cart', 'cartItems']),
    cartTotal: {
      get() {
        return this.$store.getters.getCartTotal
      },
    },
    cartItems: {
      get() {
        return this.$store.getters.getCartItems
      },
    },
  },
  methods: {
    formatCurrency(price) {
      return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},-`
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-navbar {
  top: 0;
  width: 100%;
  position: fixed;
  box-shadow: 0 24px 54px 2px rgba(27, 27, 27, 0.18);
  z-index: 10;
  background-color: #ffffff;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__left {
      height: 80px;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    &__right {
      .cart {
        cursor: pointer;
        .fa-shopping-cart {
          font-size: 1.5em;
        }
        .wrapper-item {
          position: absolute;
          background-color: #ffffff;
          min-width: 300px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          right: 0;
          .item {
            display: block;
            padding: 8px;
            .child {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .item-image {
                width: 50px;
                height: auto;
                margin-right: 15px;
                img {
                  max-width: 100%;
                }
              }
              .item-title {
                line-height: 1;
                max-width: 110px;
                max-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
}
</style>
