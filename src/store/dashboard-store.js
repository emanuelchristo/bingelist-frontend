import { makeAutoObservable } from "mobx"
import { defaults } from "./default-states"
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function genAuthHeaders() {
  const jwt = window.localStorage.getItem("jwt")
  if (!jwt) return {}
  return { Authorization: `Bearer ${jwt}` }
}

class DashboardStore {
  /* Lists */
  lists = defaults.lists

  showCreateList = false
  createListState = "none"

  editListId = null
  showDeleteList = false

  deleteListId = null
  deleteListState = "none"

  showAddToListModal = false
  addToListMovie = null
  movieLists = { fetchState: "none", listsState: {} }
  newListsState = {}
  addToListState = "none"

  listDetails = null
  listDetailsState = "none"

  /* Discover */
  discover = defaults.discover

  /* Browse */
  browse = defaults.browse

  /* Watched faved */
  waFaStatus = {}

  /* Movie details */
  showMovieDetailsModal = false
  movieDetails = defaults.movieDetails
  youtubeVideo = null

  /* Quick search */
  quickSearchPromise = null

  /* Auth */
  user = null

  /* Filters */
  filtersConfig = {
    fetchState: "none",
    browse: null,
    random: null,
    list: null,
  }

  appliedBrowseFilters = null
  appliedRandomFilters = null
  appliedListFilters = null

  currFilters = null

  filtersDisabled = false
  filtersChanged = false

  randomFiltersActive = true
  browseFiltersActive = true
  listFiltersActive = true

  /* Similar */
  similarReference = null
  similarReferenceDetials = { fetchState: "none", details: {} }
  similarMovies = { fetchState: "none", movies: [] }

  /* Random */
  random = { fetchState: "none", movie: null }

  constructor() {
    makeAutoObservable(this)
  }

  /* RANDOM */
  fetchRandom = async () => {
    try {
      this.random.fetchState = "loading"

      const { data } = await axios.post(BACKEND_URL + "/random", {
        filters: this.randomFiltersActive ? this.appliedRandomFilters : null,
      })

      this.updateMovieWaFa([data])

      this.random = {
        movie: { ...data },
        fetchState: "success",
      }
    } catch (err) {
      this.random.fetchState = "error"
      console.err("Failed to fetch random")
    }
  }

  /* SIMILAR */
  similarAddReference = (movie) => {
    this.similarReference = movie

    this.similarReferenceDetials = { fetchState: "loading", details: null }

    axios
      .get(BACKEND_URL + "/movie_details", {
        params: { id: movie.id, media_type: movie.media_type },
        headers: genAuthHeaders(),
      })
      .then(({ data }) => {
        if (this.similarReference)
          this.similarReferenceDetials = {
            fetchState: "success",
            details: data,
          }
      })
      .catch((err) => {
        console.error("Failed to fetch similar reference details")
        this.similarReferenceDetials = { fetchState: "error", details: null }
      })

    this.fetchSimilarMovies()
  }

  similarRemoveReference = () => {
    this.similarReference = null
    this.similarMovies = { fetchState: "none", movies: [] }
  }

  fetchSimilarMovies = async () => {
    try {
      this.similarMovies.fetchState = "loading"

      const { data } = await axios.get(BACKEND_URL + "/similar", {
        params: {
          id: this.similarReference?.id,
          media_type: this.similarReference?.media_type,
        },
      })

      if (this.similarReference)
        this.similarMovies = { fetchState: "success", movies: data }
    } catch (err) {
      console.error("Failed to fetch similar movies")
      this.similarMovies = { fetchState: "error", movies: [] }
    }
  }

  /* FILTERS */
  fetchFilterSettings = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/filter_settings")

      this.filtersConfig = { ...data, fetchState: "success" }
    } catch (err) {
      console.error("Failed to fetch filter settings")
    }
  }

  handleFilterChange = (key, val) => {
    if (key === "genres") {
      if (this.currFilters.genres.includes(val)) {
        const newGenres = this.currFilters.genres.filter((item) => item !== val)
        this.currFilters = { ...this.currFilters, genres: newGenres }
      } else this.currFilters.genres.push(val)
    } else if (key === "year-from") {
      if (this.currFilters.yearTo !== "any" && val > this.currFilters.yearTo)
        return
      this.currFilters.yearFrom = val
    } else if (key === "year-to") {
      if (
        this.currFilters.yearFrom !== "any" &&
        val < this.currFilters.yearFrom
      )
        return
      this.currFilters.yearTo = val
    } else if (key === "adult") {
      this.currFilters.adult = !this.currFilters.adult
    } else {
      this.currFilters[key] = val
    }
    this.filtersChanged = true
  }

  toggleFiltersActive = (page) => {
    if (page === "browse") {
      this.browseFiltersActive = !this.browseFiltersActive
      this.browse = defaults.browse
      this.fetchBrowse()
      console.log("Fetching browse")
    } else if (page === "random") {
      this.randomFiltersActive = !this.randomFiltersActive
      this.random = defaults.random
      this.fetchRandom()
    } else if (page === "list") this.listFiltersActive = !this.listFiltersActive
  }

  applyFilters = (page) => {
    if (page === "browse") {
      this.appliedBrowseFilters = JSON.parse(JSON.stringify(this.currFilters))
      this.browse = defaults.browse
      this.fetchBrowse()
    } else if (page === "random") {
      this.appliedRandomFilters = JSON.parse(JSON.stringify(this.currFilters))
      this.random = defaults.random
      this.fetchRandom()
    } else if (page === "list")
      this.appliedListFilters = JSON.parse(JSON.stringify(this.currFilters))

    this.filtersChanged = false
  }

  resetFilter = (page) => {
    if (page === "browse") {
      const temp = JSON.stringify(this.filtersConfig.browse.defaultFilters)
      this.appliedBrowseFilters = JSON.parse(temp)
      this.currFilters = JSON.parse(temp)
      this.browse = defaults.browse
      this.fetchBrowse()
    } else if (page === "random") {
      const temp = JSON.stringify(this.filtersConfig.random.defaultFilters)
      this.appliedRandomFilters = JSON.parse(temp)
      this.currFilters = JSON.parse(temp)
      this.random = defaults.random
      this.fetchRandom()
    } else if (page === "list") {
      const temp = JSON.stringify(this.filtersConfig.list.defaultFilters)
      this.appliedListFilters = JSON.parse(temp)
      this.currFilters = JSON.parse(temp)
    }

    this.filtersChanged = false
  }

  /* LISTS ACTIONS */
  fetchLists = async () => {
    try {
      this.lists.fetchState = "loading"
      const { data } = await axios.get(BACKEND_URL + "/lists", {
        headers: genAuthHeaders(),
      })
      this.lists = { ...data, fetchState: "success" }
    } catch (err) {
      console.error("Failed to fetch lists")
      this.lists = { ...defaults.lists, fetchState: "error" }
    }
  }

  fetchListDetials = async (listId) => {
    try {
      this.listDetailsState = "loading"
      this.listDetails = null

      const { data } = await axios.get(BACKEND_URL + "/list_details", {
        params: { listId: listId },
        headers: genAuthHeaders(),
      })

      this.updateMovieWaFa(data.movies)

      this.listDetailsState = "success"
      this.listDetails = data
    } catch (err) {
      this.listDetailsState = "error"
      console.error("Failed to fetch list details")
    }
  }

  getSortedYourLists = () => {
    const temp = this.lists.yourLists.filter(() => 1)
    temp.sort((a, b) => a.name.localeCompare(b.name))
    return temp
  }

  getListById = (listId) => {
    const res = this.lists.yourLists.find((item) => item.listId == listId)

    if (res) return res
    if (this.lists.watched?.listId === listId) return this.lists.watched
    if (this.lists.favourites?.listId === listId) return this.lists.favourites
  }

  /* Create list */
  createNewList = () => {
    this.showCreateList = true
    this.createListState = "none"
  }

  cancelCreateList = () => {
    this.showCreateList = false
    this.createListState = "none"
  }

  okCreateList = async ({ emoji, title }) => {
    try {
      this.createListState = "loading"

      const { data } = await axios.post(BACKEND_URL + "/create_list", null, {
        headers: genAuthHeaders(),
        params: { listName: title, listEmoji: emoji },
      })

      this.lists.yourLists.push(data)
      this.createListState = "none"
      this.showCreateList = false

      // window.location = '/dashboard/list/' + data.listId
    } catch (err) {
      console.error("Failed to create list")
      this.createListState = "error"
    }
  }

  /* Edit list */
  editList = (listId) => {
    this.showCreateList = true
    this.editListId = listId
    this.createListState = "none"
  }

  cancelEditList = () => {
    this.showCreateList = false
    this.editListId = null
    this.createListState = "none"
  }

  okEditList = async ({ title, emoji }) => {
    try {
      this.createListState = "loading"

      const { data } = await axios.post(BACKEND_URL + "/edit_list", null, {
        headers: genAuthHeaders(),
        params: { listId: this.editListId, listName: title, listEmoji: emoji },
      })

      const temp = this.lists.yourLists.filter(
        (item) => item.listId != this.editListId
      )
      temp.push(data)

      this.lists = { ...this.lists, yourLists: temp }

      this.createListState = "none"
      this.showCreateList = false
      this.editListId = null
    } catch (err) {
      console.error("Failed to edit list")
      this.createListState = "error"
    }
  }

  /* Delete list */
  deleteList = (listId) => {
    this.showDeleteList = true
    this.deleteListId = listId
    this.deleteListState = "none"
  }

  cancelDeleteList = () => {
    this.showDeleteList = false
    this.deleteListId = null
    this.deleteListState = "none"
  }

  okDeleteList = async () => {
    try {
      this.deleteListState = "loading"

      await axios.post(BACKEND_URL + "/delete_list", null, {
        headers: genAuthHeaders(),
        params: { listId: this.deleteListId },
      })

      const temp = this.lists.yourLists.filter(
        (item) => item.listId != this.deleteListId
      )
      this.lists = temp

      this.showDeleteList = false
      this.deleteListId = null
      this.deleteListState = "success"
      window.location = "/dashboard/discover"
    } catch (err) {
      console.error("Failed to delete list")
      this.deleteListState = "error"
    }
  }

  /* Add to list */
  addToList = async (movie) => {
    try {
      this.showAddToListModal = true
      this.addToListMovie = movie
      this.movieLists = { fetchState: "loading", listsState: {} }

      const { data } = await axios(BACKEND_URL + "/get_movie_lists", {
        params: { id: movie.id, media_type: movie.media_type },
        headers: genAuthHeaders(),
      })

      this.movieLists = { fetchState: "success", listsState: data }
      this.newListsState = data
    } catch (err) {
      this.movieLists = { fetchState: "error", listsState: {} }
      this.newListsState = {}
      console.error("Failed to fetch lists movie is in")
    }
  }

  cancelAddToList = () => {
    this.addToListMovie = null
    this.showAddToListModal = false
    this.movieLists = { fetchState: "none", listsState: {} }
    this.newListsState = {}
  }

  toggleListInclude = (listId) => {
    this.newListsState[listId] = !this.newListsState[listId]
  }

  okAddToList = async () => {
    try {
      this.addToListState = "loading"

      await axios.post(BACKEND_URL + "/add_movie_list", this.newListsState, {
        params: {
          id: this.addToListMovie.id,
          media_type: this.addToListMovie.media_type,
        },
        headers: genAuthHeaders(),
      })

      /* Update list views */
      for (let key in this.newListsState) {
        let action
        if (
          this.movieLists.listsState[key] === true &&
          this.newListsState[key] === false
        )
          action = "remove"
        else if (
          this.movieLists.listsState[key] === false &&
          this.newListsState[key] === true
        )
          action = "add"
        else continue

        this.lists.yourLists.find((item) => item.listId === key).count +=
          action === "remove" ? -1 : 1

        this.addOrRemoveFromDisplayedList(this.addToListMovie, key, action)
      }

      this.addToListState = "success"
      this.addToListMovie = null
      this.showAddToListModal = false
      this.movieLists = { fetchState: "none", listsState: {} }
      this.newListsState = {}
    } catch (err) {
      console.error("Failed to update add to list")
      this.addToListState = "error"
    }
  }

  addOneMovieToList = async (movie, listId) => {
    try {
      await axios.get(BACKEND_URL + "/add_one_movie_to_list", {
        params: { id: movie.id, media_type: movie.media_type, listId: listId },
        headers: genAuthHeaders(),
      })

      this.updateMovieWaFa([movie])

      let currList
      currList = this.lists.yourLists.find((item) => item.listId === listId)
      if (!currList) {
        if (this.user.fav_lid === listId) currList = this.lists.favourites
        else if (this.user.watch_lid === listId) currList = this.lists.watched
      }

      currList.count += 1

      this.addOrRemoveFromDisplayedList(movie, listId, "add")
    } catch (err) {
      console.error("Failed to add one movie to list")
    }
  }

  addOrRemoveFromDisplayedList = (movie, listId, action) => {
    if (!this.listDetails || this.listDetails.listId !== listId) return

    if (action === "remove") {
      const temp = this.listDetails.movies.filter((item) => {
        return !(item.id === movie.id && item.media_type === movie.media_type)
      })
      this.listDetails = { ...this.listDetails, movies: temp }
    } else if (action === "add") {
      this.listDetails = {
        ...this.listDetails,
        movies: [...this.listDetails.movies, movie],
      }
    }
  }

  /* WATCHED FAVED */
  updateMovieWaFa = async (movieList) => {
    try {
      const movieIds = movieList.map((item) => {
        return { id: item.id, media_type: item.media_type }
      })

      const existingIds = new Set(Object.keys(this.waFaStatus))

      const temp = movieIds.filter((item) => !existingIds.has(item))

      if (temp.length === 0) return

      const { data } = await axios.post(
        BACKEND_URL + "/watched_or_faved",
        {
          movieList: movieIds,
        },
        { headers: genAuthHeaders() }
      )

      this.waFaStatus = { ...this.waFaStatus, ...data }
    } catch (err) {
      console.log(err)
      console.error("Failed to update watched faved status")
    }
  }

  getMovieWaFa = (movieId) => {
    const key = movieId.media_type + "_" + movieId.id
    return this.waFaStatus[key] ?? null
  }

  favMovie = async (movie) => {
    try {
      const { data } = await axios.post(BACKEND_URL + "/add_to_favlist", null, {
        params: {
          id: movie.id,
          media_type: movie.media_type,
        },
        headers: genAuthHeaders(),
      })

      const finalStatus = data[Object.keys(data)[0]].faved
      if (finalStatus === true) {
        this.lists.favourites.count += 1
        this.addOrRemoveFromDisplayedList(movie, this.user.fav_lid, "add")
      } else {
        this.lists.favourites.count -= 1
        this.addOrRemoveFromDisplayedList(movie, this.user.fav_lid, "remove")
      }

      this.waFaStatus = { ...this.waFaStatus, ...data }
    } catch (err) {
      console.error("Failed to favourite")
    }
  }

  watchedMovie = async (movie) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + "/add_to_watchlist",
        null,
        {
          params: {
            id: movie.id,
            media_type: movie.media_type,
          },
          headers: genAuthHeaders(),
        }
      )

      const finalStatus = data[Object.keys(data)[0]].watched
      if (finalStatus === true) {
        this.lists.watched.count += 1
        this.addOrRemoveFromDisplayedList(movie, this.user.watch_lid, "add")
      } else {
        this.lists.watched.count -= 1
        this.addOrRemoveFromDisplayedList(movie, this.user.watch_lid, "remove")
      }

      this.waFaStatus = { ...this.waFaStatus, ...data }
    } catch (err) {
      console.log(err)
      console.error("Failed to mark movie as watched")
    }
  }

  /* DISCOVER */
  fetchDiscover = async () => {
    try {
      this.discover.fetchState = "loading"

      const { data } = await axios.get(BACKEND_URL + "/discover")

      // Fetching watched faved status
      const merged = [
        ...data.trending,
        ...data.popular.tv,
        ...data.popular.movies,
        ...data.upcoming.movies,
        ...data.upcoming.tv,
      ]
      this.updateMovieWaFa(merged)

      this.discover = { ...data, fetchState: "success" }
    } catch (err) {
      console.error("Failed to fetch discover")
      this.discover = { ...defaults.discover, fetchState: "error" }
    }
  }

  /* BROWSE */
  fetchBrowse = async () => {
    try {
      this.browse.fetchState = "loading"

      const { data } = await axios.post(
        BACKEND_URL + "/browse",
        {
          filters: this.browseFiltersActive ? this.appliedBrowseFilters : null,
        },
        { params: { pageNo: this.browse.currPage } }
      )

      this.updateMovieWaFa(data.movies)

      if (data.currPage !== this.browse.currPage) return

      this.browse = {
        movies: [...this.browse.movies, ...data.movies],
        currPage: data.currPage + 1,
        totalPages: data.totalPages,
        fetchState: "success",
      }
    } catch (err) {
      this.browse.fetchState = "error"
      console.err("Failed to fetch browse")
    }
  }

  /* MOVIE */
  showMovieModal = async (movieId) => {
    try {
      this.showMovieDetailsModal = true

      this.movieDetails = {
        details: null,
        fetchState: "loading",
      }

      this.updateMovieWaFa([movieId])
      const { data } = await axios.get(BACKEND_URL + "/movie_details", {
        params: movieId,
        headers: genAuthHeaders(),
      })

      this.movieDetails = {
        details: data,
        fetchState: "success",
      }
    } catch (err) {
      console.error("Failed to fetch movie details")
      this.movieDetails = {
        details: null,
        fetchState: "error",
      }
    }
  }

  closeMovieModal = () => {
    this.showMovieDetailsModal = false
    this.movieDetails = { details: null, fetchState: "none" }
  }

  playTrailer = (trailerUrl) => {
    this.youtubeVideo = trailerUrl
  }

  closeYoutubeModal = () => {
    this.youtubeVideo = null
  }

  /* GOOGLE AUTH */
  handleGoogleLogin = (response) => {
    const jwt = response.credential
    window.localStorage.setItem("jwt", jwt)

    this.signIn()
  }

  signOut = () => {
    localStorage.removeItem("jwt")
    window.location = "/"
  }

  signIn = () => {
    let inDashboard = window.location.pathname.startsWith("/dashboard")

    const jwt = window.localStorage.getItem("jwt")

    if (!jwt) {
      if (inDashboard) window.location = "/"
    } else {
      axios
        .post(BACKEND_URL + "/sign_in", null, { headers: genAuthHeaders() })
        .then(({ data }) => {
          this.user = data
          if (!inDashboard) window.location = "/dashboard/discover"
        })
        .catch(() => {
          console.error("Failed to sign in")
          localStorage.removeItem("jwt")
          window.location = "/"
        })
    }
  }

  /* QUICK SEARCH */
  quickSearch = () => {
    return new Promise((resolve) => {
      this.quickSearchPromise = resolve
    })
  }

  fetchQuickSearch = (query) => {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.get(BACKEND_URL + "/quick_search", {
          params: { query: query },
        })
        resolve(data)
      } catch (err) {
        console.error("Failed to fetch quick search")
        resolve([])
      }
    })
  }

  chooseQuickSearch = (movie) => {
    this.quickSearchPromise(movie)
    this.quickSearchPromise = null
  }

  closeQuickSearch = () => {
    this.quickSearchPromise(null)
    this.quickSearchPromise = null
  }
}

export default DashboardStore
