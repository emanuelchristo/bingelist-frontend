import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { defaults } from './default-states'
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

	/* Discover */
	discover = defaults.discover

	/* Watched faved */
	waFaStatus = {}

	/* Movie details */
	showMovieDetailsModal = false
	movieDetails = defaults.movieDetails
	youtubeVideo = null

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

	showAddToListModal = false
	showQuickSearch = false

	movieModalId = null
	addToListMovieId = null
	quickSearchPromise = null

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

			window.location = '/dashboard/list/' + data.listId
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

	/* WATCHED FAVED */
	updateMovieWaFa = async (movieList) => {
		try {
			const movieIds = movieList.map((item) => {
				return { id: item.id, media_type: item.media_type }
			})

			const { data } = await axios.post(BACKEND_URL + '/watched_or_faved', {
				movieList: movieIds,
			})

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.error('Failed to update watched faved status')
		}
	}

	getMovieWaFa = (movieId) => {
		const key = movieId.media_type + '_' + movieId.id
		return this.waFaStatus[key] ?? null
	}

	favMovie = async (movieId) => {
		try {
			const { data } = await axios.post(BACKEND_URL + '/add_to_favlist', null, {
				params: {
					...movieId,
				},
			})

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.error('Failed to favourite')
		}
	}

	watchedMovie = async (movieId) => {
		try {
			const { data } = await axios.post(BACKEND_URL + '/add_to_watchlist', null, {
				params: {
					...movieId,
				},
			})

			this.waFaStatus = { ...this.waFaStatus, ...data }
		} catch (err) {
			console.error('Failed to mark movie as watched')
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

	handleAddToListClick = (movieId) => {
		this.showAddToListModal = true
		this.addToListMovieId = movieId
	}

	handleAddToListOk = (movieId, listIds) => {}

	handleAddToListCancel = () => {
		this.addToListMovieId = null
		this.showAddToListModal = false
	}

	// GOOGLE AUTH
	signIn = () => {
		google.accounts.id.prompt()
	}

	handleGoogleLogin = (response) => {
		const jwt = response.credential
		console.log(jwt)
		window.localStorage.setItem('jwt', jwt)

		this.verifyJwt()

		// call signup to server here
	}

	signOut = () => {
		localStorage.removeItem('jwt')
		window.location = '/'
	}

	verifyJwt = () => {
		let inDashboard = false
		if (window.location.pathname.startsWith('/dashboard')) inDashboard = true

		const jwt = window.localStorage.getItem('jwt')
		if (!jwt) {
			if (inDashboard) window.location = '/'
		} else {
			if (!inDashboard) window.location = '/dashboard/discover'
		}

		// axios.post(BACKEND_URL + '/sign_in', { jwt: jwt }).then(({ data }) => {
		// 	data = { valid: true }
		// 	if (!data.valid) {
		// 		if (inDashboard) window.location = '/'
		// 	} else {
		// 		if (!inDashboard) window.location = '/dashboard/discover'
		// 	}
		// })
	}

	// QUICK SEARCH
	getQuickSearch = () => {
		this.showQuickSearch = true
		return new Promise((resolve) => {
			this.quickSearchPromise = resolve
		})
	}

	chooseQuickSearch = (movieId) => {
		this.showQuickSearch = false
		this.quickSearchPromise(movieId)
		this.quickSearchPromise = null
	}

	closeQuickSearch = () => {
		this.showQuickSearch = false
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
