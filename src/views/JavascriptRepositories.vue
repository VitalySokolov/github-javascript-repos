<template>
  <div>
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>
    <div class="header">Javascript Repositories</div>
    <Table :repos="repos" @onScroll="loadMore"/>
  </div>
</template>

<script>
  import SearchService from '../services/SearchService.js'
  import Table from '../components/Table'

  export default {
    components: {
      Table
    },

    data() {
      return {
        currentPage: 1,
        repos: [],
        ids: new Set(),
        loading: true
      }
    },

    created() {
      SearchService.getReposInfo()
        .then(repos => {
          this.repos.push(...repos)
          repos.forEach((repo) => this.ids.add(repo.id))
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
        .then(() => this.loading = false)
    },

    methods: {
      loadMore() {
        this.loading = true
        this.currentPage += 1
        SearchService.getReposInfo(this.currentPage)
          .then((repos) => {
            repos.forEach((repo) => {
              if (this.ids.has(repo.id)) {
                return
              }

              this.ids.add(repo.id)
              this.repos.push(repo)
            })
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
          .then(() => this.loading = false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $purple: #5c4084;

  .header {
    padding: 60px;
    text-align: center;
    font-size: 30px;
  }

  .loading {
    text-align: center;
    position: fixed;
    color: #fff;
    z-index: 9;
    background: $purple;
    padding: 8px 18px;
    border-radius: 5px;
    left: calc(50% - 45px);
    top: calc(50% - 18px);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
