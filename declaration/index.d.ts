import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $setQueryParam(val: string, param: string): void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $setQueryParam(val: string, param: string): void
  }
  interface Context {
    $setQueryParam(val: string, param: string): void
  }
}
