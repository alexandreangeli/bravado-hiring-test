<template>
  <div
    ref="lazy-loading-list"
    class="lazy-loading-list"
    v-on:scroll="scrollHandler"
    v-on:touchmove="scrollHandler"
  >
    <slot name="header"></slot>

    <div v-for="item in filteredItems" :key="keyGenerator(item)">
      <slot name="item" :item="item"></slot>
    </div>

    <div ref="scroll-helper" class="lazy-loading-list__scroll-helper"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import INFINITE_SCROLL_INCREMENT from '~/constants/INFINITE_SCROLL_INCREMENT.js'

export default Vue.extend({
  name: 'LazyLoadingList',

  props: {
    items: {
      type: Array,
      required: true,
    },
    keyGenerator: {
      type: Function,
      required: true,
    },
  },

  data: function (): {
    totalItemsToShow: number
    scrollObserver: null | IntersectionObserver
  } {
    return {
      totalItemsToShow: INFINITE_SCROLL_INCREMENT,
      scrollObserver: null,
    }
  },

  computed: {
    filteredItems: function (): Array<any> {
      return this.items.slice(0, this.totalItemsToShow)
    },
  },

  methods: {
    scrollHandler(event: Event) {
      const element = event.target as Element

      const reachedBottom =
        element &&
        element.scrollHeight - element.scrollTop === element.clientHeight

      if (reachedBottom && this.items.length > this.totalItemsToShow) {
        this.totalItemsToShow += INFINITE_SCROLL_INCREMENT
      }
    },

    checkIfNeedsToAddMoreItems() {
      const element = this.$refs['lazy-loading-list'] as Element
      if (
        element &&
        element.scrollHeight <= element.clientHeight &&
        this.totalItemsToShow < this.items.length
      ) {
        setTimeout(() => (this.totalItemsToShow += INFINITE_SCROLL_INCREMENT))
      }
    },
  },

  mounted() {
    this.checkIfNeedsToAddMoreItems()
  },

  watch: {
    filteredItems(newVal) {
      if (newVal.length < this.totalItemsToShow || !this.totalItemsToShow) {
        this.totalItemsToShow = newVal.length
      } else {
        this.checkIfNeedsToAddMoreItems()
      }
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
