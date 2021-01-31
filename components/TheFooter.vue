<template>
  <footer>
    <div class="text-center">
      <p>&#169; {{ year }} Evermos</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    const year = new Date().getFullYear()
    this.year = year
  },
}
</script>
