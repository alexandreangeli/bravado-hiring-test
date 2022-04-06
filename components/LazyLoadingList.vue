<template>
  <div ref="lazy-loading-list" class="lazy-loading-list">
    <slot name="header" />

    <div v-for="(item, i) in filteredItems" :key="i">
      <slot name="item" :item="item" />
    </div>

    <div ref="scroll-helper" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QueryParams from '~/constants/QueryParams'
import updateQueryParam from '~/functions/updateQueryParam'

const LIST_SCROLL_INCREMENT = 10

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
      totalItemsToShow:
        parseInt(this.$route.query[QueryParams.QS_ITEMS_COUNT]?.toString()) ||
        LIST_SCROLL_INCREMENT,
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
              if (isIntersecting) {
                this.totalItemsToShow += LIST_SCROLL_INCREMENT
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
    filteredItems(newVal) {
      if (newVal.length < this.totalItemsToShow || !this.totalItemsToShow) {
        this.totalItemsToShow = newVal.length
        this.resetScrollObserver()
      }
    },
    totalItemsToShow(newVal) {
      updateQueryParam(this, newVal, QueryParams.QS_ITEMS_COUNT)
    },
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
