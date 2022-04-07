<template>
  <div ref="page__outer" class="page__outer">
    <div class="page__inner">
      <lazy-loading-list :items="filteredBySearchUsers">
        <template v-slot:header>
          <search-input placeholder="Search user" />
        </template>

        <template v-slot:item="{ item }">
          <user-card :user="item" />
        </template>
      </lazy-loading-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchInput from '~/components/SearchInput.vue'
import UserCard from '~/components/UserCard.vue'
import QueryParams from '~/constants/QueryParams'
import GetUsersURL from '~/constants/GetUsersURL'
import IUser from '~/types/IUser'

export default Vue.extend({
  name: 'IndexPage',

  components: { SearchInput, UserCard },

  data: function (): {
    allUsers: IUser[]
  } {
    return {
      allUsers: [],
    }
  },

  computed: {
    filteredBySearchUsers: function (): IUser[] {
      const currentSearch = this.$route.query[QueryParams.QS_SEARCH]
        ?.toString()
        .toUpperCase()

      return currentSearch
        ? this.allUsers.filter(
            (u) =>
              u.name.toUpperCase().includes(currentSearch) ||
              u.email.toUpperCase().includes(currentSearch) ||
              u.title.toUpperCase().includes(currentSearch) ||
              u.city.toUpperCase().includes(currentSearch) ||
              u.address.toUpperCase().includes(currentSearch)
          )
        : this.allUsers
    },
  },

  async mounted() {
    const usersResponse = await fetch(GetUsersURL)
    this.allUsers = await usersResponse.json()
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
