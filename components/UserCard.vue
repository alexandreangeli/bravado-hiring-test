<template>
  <div class="user-card">
    <div class="user-card__photo-wrapper">
      <div
        class="user-card__photo"
        :style="{ 'background-image': 'url(' + user.avatar + ')' }"
      />
    </div>
    <div class="user-card__right">
      <div class="user-card__info">
        <div class="user-card__name-mail-wrapper">
          <div class="user-card__name">
            {{ user.name }}
          </div>
          <div class="user-card__email">
            {{ user.email }}
          </div>
        </div>

        <div class="user-card__title">
          {{ user.title }}
        </div>
        <div class="user-card__address">
          {{ `${user.address}, ${user.city}` }}
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
  width: 135px;
  height: 135px;
  background-size: contain;
}
.user-card__right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-card__info {
  padding: 10px 10px 10px 28px;
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
</style>
