<template>
  <div ref="lazy-loading-list" class="lazy-loading-list">
    <slot name="header"></slot>

    <div v-for="(item, i) in filteredItems" :key="i">
      <slot name="item" :item="item"></slot>
    </div>

    <div ref="scroll-helper" class="lazy-loading-list__scroll-helper"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InfiniteScrollIncrement from '~/constants/INFINITE_SCROLL_INCREMENT.js'

export default Vue.extend({
  name: 'LazyLoadingList',

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data: function (): {
    totalItemsToShow: number
    scrollObserver: null | IntersectionObserver
  } {
    return {
      totalItemsToShow: InfiniteScrollIncrement,
      scrollObserver: null,
    }
  },

  computed: {
    filteredItems: function (): Array<any> {
      return this.items.slice(0, this.totalItemsToShow)
    },
  },

  methods: {
    resetScrollObserver() {
      if (this.scrollObserver) {
        this.scrollObserver.disconnect()
      } else {
        this.scrollObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach(({ isIntersecting }) => {
              if (isIntersecting && this.items.length > this.totalItemsToShow) {
                this.totalItemsToShow += InfiniteScrollIncrement
              }
            })
          },
          {
            root: this.$refs['lazy-loading-list'] as Element,
          }
        )
      }

      if (this.$refs['scroll-helper']) {
        this.scrollObserver.observe(this.$refs['scroll-helper'] as Element)
      }
    },
  },

  mounted() {
    this.resetScrollObserver()
  },

  watch: {
    items() {
      this.resetScrollObserver()
    },
    filteredItems(newVal) {
      if (newVal.length < this.totalItemsToShow || !this.totalItemsToShow) {
        this.totalItemsToShow = newVal.length
      }
    },
    totalItemsToShow(newVal) {
      console.log(newVal)
    },
  },
})
</script>

<style scoped>
.lazy-loading-list {
  height: 100%;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
}
.lazy-loading-list__scroll-helper {
  min-height: 5px;
  width: 100%;
}
</style>
