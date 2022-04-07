<template>
  <div ref="lazy-loading-list" class="lazy-loading-list">
    <slot name="header"></slot>

    <div v-for="(item, i) in filteredItems" :key="i">
      <slot name="item" :item="item"></slot>
    </div>

    <div ref="scroll-helper"></div>
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

  mounted() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect()
    } else {
      this.scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting }) => {
            if (isIntersecting) {
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
})
</script>

<style scoped>
.lazy-loading-list {
  height: 100%;
  overflow: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
}
</style>
