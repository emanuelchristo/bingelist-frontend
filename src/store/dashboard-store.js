import { makeAutoObservable, runInAction } from 'mobx'
import { defaults } from './default-states'
import axios from 'axios'
// import { googleSignIn } from '../utils/google-auth'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const defaultFilters = {
	sort: 'popularity',
	type: 'all',
	genres: [],
	year: {
		from: 1990,
		to: 2023,
	},
	minImdb: 0,
	minRt: 0,
	language: 'en',
	duration: 'under-2hr',
	adult: true,
}

function genYearOptions() {
	const options = []
	const currYear = new Date().getFullYear()
	for (let i = 1950; i <= currYear; i++) options.push({ value: i, name: i })
	return options
}

function genImdbOptions() {
	const options = []
	for (let i = 0; i <= 10; i++) options.push({ value: i, name: i })
	return options
}

function genRtOptions() {
	const options = []
	for (let i = 0; i <= 100; i = i + 10) options.push({ value: i, name: i + '%' })
	return options
}

function genAuthHeaders() {
	const jwt = window.localStorage.getItem('jwt')
	if (!jwt) return {}
	return { Authorization: `Bearer ${jwt}` }
}

class DashboardStore {
	/* Lists */
	lists = defaults.lists

	showCreateList = false
	createListState = 'none'

	editListId = null
	showDeleteList = false

	deleteListId = null
	deleteListState = 'none'

	showAddToListModal = false
	addToListMovie = null
	movieLists = { fetchState: 'none', listsState: {} }
	newListsState = {}
	addToListState = 'none'

	listDetails = null
	listDetailsState = 'none'

	/* Discover */
	discover = defaults.discover

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

	filterSettings = {
		sortOptions: [
			{ value: 'popularity', name: 'Popularity' },
			{ value: 'latest', name: 'Latest' },
		],
		type: [
			{ name: 'All', value: 'all' },
			{ name: 'Movies', value: 'movies' },
			{ name: 'TV Shows', value: 'tv-shows' },
		],
		genres: [
			{ name: 'Action', value: 'action' },
			{ name: 'Adventure', value: 'adventure' },
			{ name: 'Animation', value: 'animation' },
			{ name: 'Comedy', value: 'comedy' },
			{ name: 'Crime', value: 'crime' },
			{ name: 'Documentary', value: 'documentary' },
			{ name: 'Drama', value: 'drama' },
			{ name: 'Family', value: 'family' },
			{ name: 'Fantasy', value: 'fantasy' },
			{ name: 'History', value: 'history' },
			{ name: 'Horror', value: 'horror' },
			{ name: 'Music', value: 'music' },
			{ name: 'Mystery', value: 'mystery' },
			{ name: 'Romance', value: 'romance' },
			{ name: 'Sci Fi', value: 'sci-fi' },
			{ name: 'TV Movie', value: 'tv-movie' },
			{ name: 'Thriller', value: 'thriller' },
			{ name: 'War', value: 'war' },
			{ name: 'Western', value: 'western' },
		],
		yearOptions: genYearOptions(),
		imdbOptions: genImdbOptions(),
		rtOptions: genRtOptions(),
		languageOptions: [
			{ name: 'English', value: 'en' },
			{ name: 'Hindi', value: 'hi' },
		],
		durationOptions: [
			{ value: 'under-2hr', name: 'Under 2hr' },
			{ value: 'under-3hr', name: 'Under 3hr' },
		],
	}
	filtersActive = true
	filters = { ...defaultFilters }
	filtersChanged = false
	appliedFilters = { ...defaultFilters }

	constructor() {
		makeAutoObservable(this)
	}

	/* LISTS ACTIONS */
	fetchLists = async () => {
		try {
			this.lists.fetchState = 'loading'
			const { data } = await axios.get(BACKEND_URL + '/lists', { headers: genAuthHeaders() })
			this.lists = { ...data, fetchState: 'success' }
		} catch (err) {
			console.error('Failed to fetch lists')
			this.lists = { ...defaults.lists, fetchState: 'error' }
		}
	}

	fetchListDetials = async (listId) => {
		try {
			this.listDetailsState = 'loading'
			this.listDetails = null

			const { data } = await axios.get(BACKEND_URL + '/list_details', {
				params: { listId: listId },
				headers: genAuthHeaders(),
			})

			this.updateMovieWaFa(data.movies)

			this.listDetailsState = 'success'
			this.listDetails = data
		} catch (err) {
			this.listDetailsState = 'error'
			console.error('Failed to fetch list details')
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
		this.createListState = 'none'
	}

	cancelCreateList = () => {
		this.showCreateList = false
		this.createListState = 'none'
	}

	okCreateList = async ({ emoji, title }) => {
		try {
			this.createListState = 'loading'

			const { data } = await axios.post(BACKEND_URL + '/create_list', null, {
				headers: genAuthHeaders(),
				params: { listName: title, listEmoji: emoji },
			})

			this.lists.yourLists.push(data)
			this.createListState = 'none'
			this.showCreateList = false

			// window.location = '/dashboard/list/' + data.listId
		} catch (err) {
			console.error('Failed to create list')
			this.createListState = 'error'
		}
	}

	/* Edit list */
	editList = (listId) => {
		this.showCreateList = true
		this.editListId = listId
		this.createListState = 'none'
	}

	cancelEditList = () => {
		this.showCreateList = false
		this.editListId = null
		this.createListState = 'none'
	}

	okEditList = async ({ title, emoji }) => {
		try {
			this.createListState = 'loading'

			const { data } = await axios.post(BACKEND_URL + '/edit_list', null, {
				headers: genAuthHeaders(),
				params: { listId: this.editListId, listName: title, listEmoji: emoji },
			})

			const temp = this.lists.yourLists.filter((item) => item.listId != this.editListId)
			temp.push(data)

			this.lists = { ...this.lists, yourLists: temp }

			this.createListState = 'none'
			this.showCreateList = false
			this.editListId = null
		} catch (err) {
			console.error('Failed to edit list')
			this.createListState = 'error'
		}
	}

	/* Delete list */
	deleteList = (listId) => {
		this.showDeleteList = true
		this.deleteListId = listId
		this.deleteListState = 'none'
	}

	cancelDeleteList = () => {
		this.showDeleteList = false
		this.deleteListId = null
		this.deleteListState = 'none'
	}

	okDeleteList = async () => {
		try {
			this.deleteListState = 'loading'

			await axios.post(BACKEND_URL + '/delete_list', null, {
				headers: genAuthHeaders(),
				params: { listId: this.deleteListId },
			})

			const temp = this.lists.yourLists.filter((item) => item.listId != this.deleteListId)
			this.lists = temp

			this.showDeleteList = false
			this.deleteListId = null
			this.deleteListState = 'success'
			window.location = '/dashboard/discover'
		} catch (err) {
			console.error('Failed to delete list')
			this.deleteListState = 'error'
		}
	}

	/* Add to list */
	addToList = async (movie) => {
		try {
			this.showAddToListModal = true
			this.addToListMovie = movie
			this.movieLists = { fetchState: 'loading', listsState: {} }

			const { data } = await axios(BACKEND_URL + '/get_movie_lists', {
				params: { id: movie.id, media_type: movie.media_type },
				headers: genAuthHeaders(),
			})

			this.movieLists = { fetchState: 'success', listsState: data }
			this.newListsState = data
		} catch (err) {
			this.movieLists = { fetchState: 'error', listsState: {} }
			this.newListsState = {}
			console.error('Failed to fetch lists movie is in')
		}
	}

	cancelAddToList = () => {
		this.addToListMovie = null
		this.showAddToListModal = false
		this.movieLists = { fetchState: 'none', listsState: {} }
		this.newListsState = {}
	}

	toggleListInclude = (listId) => {
		this.newListsState[listId] = !this.newListsState[listId]
	}

	okAddToList = async () => {
		try {
			this.addToListState = 'loading'

			await axios.post(BACKEND_URL + '/add_movie_list', this.newListsState, {
				params: { id: this.addToListMovie.id, media_type: this.addToListMovie.media_type },
				headers: genAuthHeaders(),
			})

			/* Update list views */
			for (let key in this.newListsState) {
				let action
				if (this.movieLists.listsState[key] === true && this.newListsState[key] === false) action = 'remove'
				else if (this.movieLists.listsState[key] === false && this.newListsState[key] === true) action = 'add'
				else continue

				this.lists.yourLists.find((item) => item.listId === key).count += action === 'remove' ? -1 : 1

				this.addOrRemoveFromDisplayedList(this.addToListMovie, key, action)
			}

			this.addToListState = 'success'
			this.addToListMovie = null
			this.showAddToListModal = false
			this.movieLists = { fetchState: 'none', listsState: {} }
			this.newListsState = {}
		} catch (err) {
			console.error('Failed to update add to list')
			this.addToListState = 'error'
		}
	}

	addOrRemoveFromDisplayedList = (movie, listId, action) => {
		if (!this.listDetails || this.listDetails.listId !== listId) return

		if (action === 'remove') {
			const temp = this.listDetails.movies.filter((item) => {
				return !(item.id === movie.id && item.media_type === movie.media_type)
			})
			this.listDetails.movies = temp
		} else if (action === 'add') {
			this.listDetails.movies.push(movie)
		}
	}

	/* WATCHED FAVED */
	updateMovieWaFa = async (movieList) => {
		try {
			const movieIds = movieList.map((item) => {
				return { id: item.id, media_type: item.media_type }
			})

			const { data } = await axios.post(
				BACKEND_URL + '/watched_or_faved',
				{
					movieList: movieIds,
				},
				{ headers: genAuthHeaders() }
			)

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.log(err)
			console.error('Failed to update watched faved status')
		}
	}

	getMovieWaFa = (movieId) => {
		const key = movieId.media_type + '_' + movieId.id
		return this.waFaStatus[key] ?? null
	}

	favMovie = async (movie) => {
		try {
			const { data } = await axios.post(BACKEND_URL + '/add_to_favlist', null, {
				params: {
					id: movie.id,
					media_type: movie.media_type,
				},
				headers: genAuthHeaders(),
			})

			const finalStatus = data[Object.keys(data)[0]].faved
			if (finalStatus === true) {
				this.lists.favourites.count += 1
				this.addOrRemoveFromDisplayedList(movie, this.user.fav_lid, 'add')
			} else {
				this.lists.favourites.count -= 1
				this.addOrRemoveFromDisplayedList(movie, this.user.fav_lid, 'remove')
			}

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.error('Failed to favourite')
		}
	}

	watchedMovie = async (movie) => {
		try {
			const { data } = await axios.post(BACKEND_URL + '/add_to_watchlist', null, {
				params: {
					id: movie.id,
					media_type: movie.media_type,
				},
				headers: genAuthHeaders(),
			})

			const finalStatus = data[Object.keys(data)[0]].watched
			if (finalStatus === true) {
				this.lists.watched.count += 1
				this.addOrRemoveFromDisplayedList(movie, this.user.watch_lid, 'add')
			} else {
				this.lists.watched.count -= 1
				this.addOrRemoveFromDisplayedList(movie, this.user.watch_lid, 'remove')
			}

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.log(err)
			console.error('Failed to mark movie as watched')
		}
	}

	/* DISCOVER ACTIONS */
	fetchDiscover = async () => {
		try {
			this.discover.fetchState = 'loading'

			const { data } = await axios.get(BACKEND_URL + '/discover')

			// Fetching watched faved status
			const merged = [
				...data.trending,
				...data.popular.tv,
				...data.popular.movies,
				...data.upcoming.movies,
				...data.upcoming.tv,
			]
			this.updateMovieWaFa(merged)

			this.discover = { ...data, fetchState: 'success' }
		} catch (err) {
			console.error('Failed to fetch discover')
			this.discover = { ...defaults.discover, fetchState: 'error' }
		}
	}

	/* MOVIE ACTIONS */
	showMovieModal = async (movieId) => {
		try {
			this.showMovieDetailsModal = true

			this.movieDetails = {
				details: null,
				fetchState: 'loading',
			}

			const { data } = await axios.get(BACKEND_URL + '/movie_details', { params: movieId, headers: genAuthHeaders() })

			this.movieDetails = {
				details: data,
				fetchState: 'success',
			}
		} catch (err) {
			console.error('Failed to fetch movie details')
			this.movieDetails = {
				details: null,
				fetchState: 'error',
			}
		}
	}

	closeMovieModal = () => {
		this.showMovieDetailsModal = false
		this.movieDetails = { details: null, fetchState: 'none' }
	}

	playTrailer = (trailerUrl) => {
		this.youtubeVideo = trailerUrl
	}

	closeYoutubeModal = () => {
		this.youtubeVideo = null
	}

	/* GOOGLE AUTH ACTIONS */
	handleGoogleLogin = (response) => {
		const jwt = response.credential
		window.localStorage.setItem('jwt', jwt)

		this.signIn()
	}

	signOut = () => {
		localStorage.removeItem('jwt')
		window.location = '/'
	}

	signIn = () => {
		let inDashboard = window.location.pathname.startsWith('/dashboard')

		const jwt = window.localStorage.getItem('jwt')

		if (!jwt) {
			if (inDashboard) window.location = '/'
		} else {
			axios
				.post(BACKEND_URL + '/sign_in', null, { headers: genAuthHeaders() })
				.then(({ data }) => {
					this.user = data
					if (!inDashboard) window.location = '/dashboard/discover'
				})
				.catch(() => {
					console.error('Failed to sign in')
					localStorage.removeItem('jwt')
					window.location = '/'
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
				const { data } = await axios.get(BACKEND_URL + '/quick_search', { params: { query: query } })
				resolve(data)
			} catch (err) {
				console.error('Failed to fetch quick search')
				resolve([])
			}
		})
	}

	chooseQuickSearch = (movieId) => {
		this.quickSearchPromise(movieId)
		this.quickSearchPromise = null
	}

	closeQuickSearch = () => {
		this.quickSearchPromise(null)
		this.quickSearchPromise = null
	}

	// SEARCH
	fetchSearch = (searchQuery, type, pageNo) => {
		return new Promise((resolve) => {
			try {
				axios
					.get(BACKEND_URL + '/search', {
						params: { searchQuery, type, pageNo },
					})
					.then(({ data }) => {
						if (data) resolve(data)
						else resolve(null)
					})
			} catch (err) {
				console.error(err)
				resolve(null)
			}
		})
	}

	// FILTERS
	handleFilterChange = (key, val) => {
		if (key === 'genres') {
			if (this.filters.genres.includes(val)) {
				const newGenres = this.filters.genres.filter((item) => item !== val)
				this.filters = { ...this.filters, genres: newGenres }
			} else this.filters.genres.push(val)
		} else if (key === 'year-from') {
			if (val > this.filters.year.to) return
			this.filters.year.from = val
		} else if (key === 'year-to') {
			if (val < this.filters.year.from) return
			this.filters.year.to = val
		} else if (key === 'adult') {
			this.filters.adult = !this.filters.adult
		} else {
			this.filters[key] = val
		}
		this.filtersChanged = true
	}

	applyFilters = () => {
		this.appliedFilters = { ...this.filters }
		this.filtersChanged = false
	}

	toggleFiltersActive = () => {
		this.filtersActive = !this.filtersActive
	}

	resetFilter = () => {
		this.filters = { ...defaultFilters }
		this.appliedFilters = { ...defaultFilters }
	}
}

export default DashboardStore
