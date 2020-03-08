/** Model definition file for the Movie Class **/



export const category = class Category {
  constructor(rawData = {}) {
    this.id = rawData.id
    this.title = rawData.title
    this.poster_path = rawData.poster_path
  }

  get posterUrl() {
    return async () => {
      let cfg = store.getters['config/images']
      if (!cfg) {
        cfg = await store.dispatch('config/get')
      }
      if (this.poster_path && cfg.base_url) {
        return cfg.base_url + cfg.poster_sizes[0] + this.poster_path
      } else {
        return ''
      }
    }
  }
}

export const summery = class Movie {
  constructor(rawData = {}) {
    this.id = rawData.id
    this.title = rawData.title
    this.poster_path = rawData.poster_path
  }

  get posterUrl() {
    return async () => {
      let cfg = store.getters['config/images']
      if (!cfg) {
        cfg = await store.dispatch('config/get')
      }
      if (this.poster_path && cfg.base_url) {
        return cfg.base_url + cfg.poster_sizes[0] + this.poster_path
      } else {
        return ''
      }
    }
  }
}