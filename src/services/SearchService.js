import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://api.github.com/search`
})

const getRepos = (page) => {
  return apiClient.get(`/repositories?q=language:JavaScript&page=${page}&per_page=20&sort=stars`)
}

const getReposInfo = (page = 1) => {
  return getRepos(page)
    .then(response => {
      const items = response.data.items

      return items.map(item => ({
        id: item.id,
        name: item.name,
        link: item.html_url,
        owner: item.owner.login,
        forks: item.forks,
        openIssues: item.open_issues,
        watchers: item.watchers
      }))
    })
}

export default {
  getReposInfo
}
