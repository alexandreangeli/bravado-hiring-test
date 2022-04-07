<template>
  <div class="search-input">
    <div class="search-input__icon">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.54"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.502 11H11.708L11.432 10.726C12.407 9.58897 13 8.11497 13 6.49997C13 2.90997 10.09 -3.24249e-05 6.5 -3.24249e-05C2.91 -3.24249e-05 0 2.90997 0 6.49997C0 10.09 2.91 13 6.5 13C8.115 13 9.588 12.408 10.725 11.434L11.001 11.708V12.5L15.999 17.491L17.49 16L12.502 11ZM6.5 11C4.014 11 2 8.98597 2 6.49997C2 4.01497 4.014 1.99997 6.5 1.99997C8.985 1.99997 11 4.01497 11 6.49997C11 8.98597 8.985 11 6.5 11Z"
          fill="black"
        ></path>
      </svg>
    </div>

    <label
      v-show="!value"
      for="search-input__input"
      class="search-input__placeholder"
    >
      {{ placeholder }}
    </label>
    <input
      v-model="value"
      class="search-input__input"
      id="search-input__input"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QueryParams from '~/constants/QueryParams.js'
import updateQueryParam from '~/functions/updateQueryParam'

const SEARCH_DEBOUNCE_TIMER = 600

export default Vue.extend({
  name: 'SearchInput',

  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },

  data(): {
    value: string
    searchDebouncer: null | NodeJS.Timeout
  } {
    return {
      value: this.$route.query[QueryParams.QS_SEARCH]?.toString(),
      searchDebouncer: null,
    }
  },

  watch: {
    value(newVal) {
      if (this.searchDebouncer) {
        clearTimeout(this.searchDebouncer)
      }

      this.searchDebouncer = setTimeout(() => {
        updateQueryParam(this, newVal, QueryParams.QS_SEARCH)
      }, SEARCH_DEBOUNCE_TIMER)
    },
  },
})
</script>

<style>
.search-input {
  display: flex;
  background: #fafafa;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  padding: 10px 20px;
  margin: 10px 0;
  position: relative;
  align-items: center;
}
.search-input__icon {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-input__placeholder {
  position: absolute;
  left: 60px;
  color: #777;
}
.search-input__input {
  border: 0;
  background: transparent;
  flex-grow: 1;
  outline: none;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.75);
}
</style>
