<template>
  <table>
    <thead>
    <tr>
      <th v-for="(header, $index) in headers"
          :key="$index"
          :header="header">
        {{header}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(repo, $index) in repos"
        :key="$index"
        :repo="repo">
      <td>{{repo.name}}</td>
      <td><a :href="repo.link" target="_blank">Link</a></td>
      <td>{{repo.owner}}</td>
      <td>{{repo.forks}}</td>
      <td>{{repo.openIssues}}</td>
      <td>{{repo.watchers}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['repos'],
    data() {
      return {
        headers: ['name', 'url', 'owner', 'forks', 'open issues', 'watchers']
      }
    },
    mounted() {
      this.scroll();
    },
    methods: {
      scroll() {
        window.onscroll = () => {
          const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

          if (bottomOfWindow) {
            this.$emit('onScroll')
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  table {
    margin: 0 auto;
    width: calc(100vw - 30%);
    border-collapse: separate;
    border: 1px solid whitesmoke;
    box-shadow: 0 0 20px 12px whitesmoke;

    th, td {
      text-align: left;
      line-height: 1.4;
      padding: 30px;

    }

    td {
      font-size: 15px;
      color: gray;
    }

    th {
      background-color: gray;
      color: white;
      text-transform: capitalize;

      font-weight: 600;
      letter-spacing: 1px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    // Sticky header
    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }
</style>