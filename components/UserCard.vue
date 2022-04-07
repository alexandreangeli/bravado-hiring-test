<template>
  <div class="user-card">
    <div class="user-card__photo-wrapper">
      <img
        class="user-card__photo"
        :src="user.avatar"
        :alt="`Picture of ${user.name}`"
        width="135px"
        height="135px"
      />
    </div>
    <div class="user-card__right">
      <div class="user-card__info">
        <div class="user-card__name-mail-wrapper">
          <div class="user-card__name">
            <div v-html="highlightedName"></div>
          </div>
          <div class="user-card__email">
            <div v-html="highlightedEmail"></div>
          </div>
        </div>

        <div class="user-card__title">
          <div v-html="highlightedTitle"></div>
        </div>
        <div class="user-card__address">
          <div v-html="highlightedFullAddress"></div>
        </div>
      </div>

      <button class="user-card__button" v-on:click="isSuitable = !isSuitable">
        {{ isSuitable ? 'Skip selection' : 'Mark as suitable' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IUser from '~/types/IUser'
import QUERY_PARAMS from '~/constants/QUERY_PARAMS'

export default Vue.extend({
  name: 'UserCard',

  props: {
    user: {
      type: Object as () => IUser,
      required: true,
    },
  },

  data(): {
    isSuitable: boolean
  } {
    return {
      isSuitable: false,
    }
  },

  computed: {
    currentSearch(): string {
      return this.$route.query[QUERY_PARAMS.QS_SEARCH]?.toString().toUpperCase()
    },
    highlightedName(): string {
      return this.getHightlightedText(this.user.name)
    },
    highlightedEmail(): string {
      return this.getHightlightedText(this.user.email)
    },
    highlightedTitle(): string {
      return this.getHightlightedText(this.user.title)
    },
    highlightedFullAddress(): string {
      return this.getHightlightedText(`${this.user.address}, ${this.user.city}`)
    },
  },

  methods: {
    getHightlightedText(value: string): string {
      return this.currentSearch
        ? value.replace(new RegExp(this.currentSearch, 'gi'), (match) => {
            return (
              '<span class="user-card__highlighted-text">' + match + '</span>'
            )
          })
        : value
    },
  },
})
</script>

<style>
.user-card {
  margin: 10px 0;
  background: #fafafa;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  display: flex;
}
.user-card__photo-wrapper {
  background: #bbbbbb;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.user-card__photo {
  background: #bbbbbb;
  object-fit: cover;
}
.user-card__right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-card__info {
  padding: 10px 10px 0px 28px;
}
.user-card__name-mail-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-card__name {
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.87);
}
.user-card__email {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.54);
  line-break: anywhere;
}
.user-card__title {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.543846);
}
.user-card__address {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.543846);
}
.user-card__button {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 15px 10px 15px 28px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #009688;
  background: transparent;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
}

.user-card__highlighted-text {
  background: #fff73b;
}
</style>
