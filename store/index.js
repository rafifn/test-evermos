export const state = () => ({
  products: [],
  cartTotal: 0,
  cartItems: [],
})

export const getters = {
  getProducts: state => {
    return state.products
  },
  getCartTotal: state => {
    return state.cartTotal
  },
  getCartItems: state => {
    return state.cartItems
  },
}

export const mutations = {
  updateProducts: (state, payload) => {
    state.products = payload
  },
  updateIncrementCart: (state, payload) => {
    state.cartTotal++
    if (state.cartItems.length) {
      const itemExists = state.cartItems.filter(
        item => item.id === payload.id
      )[0]
      if (itemExists) {
        itemExists.total++
      } else {
        state.cartItems.push(payload)
      }
    } else {
      state.cartItems.push(payload)
    }
  },
}

export const actions = {
  async getProducts({ commit }) {
    const products = await this.$axios.$get('/products/')
    commit('updateProducts', products)
  },
  async getProductDetail({ commit }, id) {
    const product = await this.$axios.$get(`/products/${id}/`)
    return { product }
  },
}
