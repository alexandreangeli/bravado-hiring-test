<template>
  <div ref="page__outer" class="page__outer">
    <div class="page__inner">
      <lazy-loading-list
        :items="filteredBySearchUsers"
        :keyGenerator="(item) => `${item.name}-${item.email}`"
      >
        <template v-slot:header>
          <search-input placeholder="Search user"></search-input>
        </template>

        <template v-slot:item="{ item }">
          <user-card :user="item"></user-card>
        </template>
      </lazy-loading-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchInput from '~/components/SearchInput.vue'
import UserCard from '~/components/UserCard.vue'
import QUERY_PARAMS from '~/constants/QUERY_PARAMS'
import usersJson from '~/static/users.json'
import IUser from '~/types/IUser'

export default Vue.extend({
  name: 'IndexPage',

  components: { SearchInput, UserCard },

  data: function (): {
    allUsers: IUser[]
  } {
    return {
      allUsers: usersJson,
    }
  },

  computed: {
    currentSearch: function () {
      return this.$route.query[QUERY_PARAMS.QS_SEARCH]?.toString().toUpperCase()
    },
    filteredBySearchUsers: function (): IUser[] {
      return this.currentSearch
        ? this.allUsers.filter(
            (u) =>
              u.name.toUpperCase().includes(this.currentSearch) ||
              u.email.toUpperCase().includes(this.currentSearch) ||
              u.title.toUpperCase().includes(this.currentSearch) ||
              u.city.toUpperCase().includes(this.currentSearch) ||
              u.address.toUpperCase().includes(this.currentSearch)
          )
        : this.allUsers
    },
  },
})
</script>

<style scoped>
.page__outer {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  padding: 55px 10px 65px 10px;
}

@media (max-width: 565px) {
  .page__outer {
    padding: 0;
  }
}

.page__inner {
  width: 565px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
</style>
