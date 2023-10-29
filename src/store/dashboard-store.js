import { makeAutoObservable } from 'mobx'
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
	lists = [
		// { listId: 1, name: 'Thrillers 90s', count: 5, emoji: '🔥' },
		// { listId: 2, name: 'Romance', count: 32, emoji: '💗' },
		// { listId: 3, name: 'Neo Noir', count: 14, emoji: '🎞️' },
		// { listId: 4, name: 'Slow Burn', count: 8, emoji: '✏️' },
	]

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

	discover = null

	showCreateList = false
	showDeleteList = false
	showMovieModal = false
	showAddToListModal = false
	showQuickSearch = false

	youtubeVideo = null
	movieModalId = null
	deleteListId = null
	addToListMovieId = null
	editListId = null
	quickSearchPromise = null

	waFaStatus = {}

	popularTab = 'movies'
	upcomingTab = 'movies'

	constructor() {
		makeAutoObservable(this)
	}

	// WATCHED FAVED
	updateMovieWaFa = (movieList) => {
		const temp = movieList.map((item) => {
			return { id: item.id, media_type: item.media_type }
		})

		axios
			.post(BACKEND_URL + '/watched_or_faved', {
				movieList: temp,
			})
			.then(({ data }) => {
				this.waFaStatus = { ...this.waFaStatus, ...data }
			})
	}

	getMovieWaFa = (movieId) => {
		const key = movieId.media_type + '_' + movieId.id
		return this.waFaStatus[key] ?? null
	}

	favMovie = (movieId) => {
		axios
			.post(BACKEND_URL + '/add_to_favlist', null, {
				params: {
					...movieId,
				},
			})
			.then(({ data }) => {
				this.waFaStatus = { ...this.waFaStatus, ...data }
			})
			.catch(console.error)
	}

	watchedMovie = (movieId) => {
		axios
			.post(BACKEND_URL + '/add_to_watchlist', null, {
				params: {
					...movieId,
				},
			})
			.then(({ data }) => {
				console.log(data)
				this.waFaStatus = { ...this.waFaStatus, ...data }
			})
			.catch(console.error)
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

		// axios.post(BACKEND_URL + '/verify_jwt', { jwt: jwt }).then(({ data }) => {
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

	// DISCOVER
	fetchDiscover = () => {
		axios.get(BACKEND_URL + '/discover').then(({ data }) => {
			// Fetching watched faved status
			const merged = [
				...data.trending,
				...data.popular.tv,
				...data.popular.movies,
				...data.upcoming.movies,
				...data.upcoming.tv,
			]
			this.updateMovieWaFa(merged)

			this.discover = data
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

	// LISTS
	fetchLists = () => {
		return new Promise((resolve, reject) => {
			try {
				axios.get(BACKEND_URL + '/lists', { headers: genAuthHeaders() }).then(({ data }) => {
					this.lists = data
					resolve()
				})
			} catch (err) {
				console.error(err)
				reject()
			}
		})
	}

	getLists = () => {
		if (!(this.lists instanceof Array)) return []
		const temp = this.lists.filter(() => 1)
		temp.sort((a, b) => a.name.localeCompare(b.name))
		return temp
	}

	getListById = (listId) => {
		return this.lists.find((item) => item.listId == listId)
	}

	handleListItemClick = (listId) => {
		this.selectedListId = listId
	}

	createNewList = () => {
		this.showCreateList = true
	}

	cancelCreateList = () => {
		this.showCreateList = false
	}

	okCreateList = ({ emoji, title }) => {
		axios
			.post(BACKEND_URL + '/create_list', null, {
				headers: genAuthHeaders(),
				params: { listName: title, listEmoji: emoji },
			})
			.then(({ data }) => {
				this.showCreateList = false
				this.lists.push(data)
				this.selectedListId = data.listId
				window.location = '/dashboard/list/' + data.listId
			})
	}

	editList = (listId) => {
		this.showCreateList = true
		this.editListId = listId
	}

	cancelEditList = () => {
		this.showCreateList = false
		this.editListId = null
	}

	okEditList = ({ title, emoji }) => {
		axios
			.post(BACKEND_URL + '/edit_list', null, {
				headers: genAuthHeaders(),
				params: { listId: this.editListId, listName: title, listEmoji: emoji },
			})
			.then(({ data }) => {
				const temp = this.lists.filter((item) => item.listId != this.editListId)
				temp.push(data)
				this.lists = temp
				this.showCreateList = false
				this.editListId = null
			})
	}

	deleteList = (listId) => {
		this.deleteListId = listId
		this.showDeleteList = true
	}

	cancelDeleteList = () => {
		this.deleteListId = null
		this.showDeleteList = false
	}

	okDeleteList = () => {
		axios
			.post(BACKEND_URL + '/delete_list', null, { headers: genAuthHeaders(), params: { listId: this.deleteListId } })
			.then(({ data }) => {
				if (data.deleted) {
					const temp = this.lists.filter((item) => item.listId != this.deleteListId)
					this.lists = temp
					this.deleteListId = null
					this.showDeleteList = false
					window.location = '/dashboard/discover'
				}
			})
	}

	// MOVIE
	fetchMovieDetails = (movieId) => {
		return new Promise(async (resolve) => {
			try {
				axios.get(BACKEND_URL + '/movie_details', { params: movieId }).then(({ data }) => {
					if (data) resolve(data)
					else resolve(null)
				})
			} catch (err) {
				console.error(err)
				resolve(null)
			}
		})
	}

	handleMovieClick = (movieId) => {
		this.showMovieModal = true
		this.movieModalId = movieId
	}

	cancelMovieModal = () => {
		this.showMovieModal = false
		this.movieModalId = null
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

	playTrailer = (trailerUrl) => {
		this.youtubeVideo = trailerUrl
	}

	closeYoutubePlayer = () => {
		this.youtubeVideo = null
	}

	// DISCOVER PAGE
	handlePopularTabChange = (value) => {
		this.popularTab = value
	}

	handleUpcomingTabChange = (value) => {
		this.upcomingTab = value
	}
}

export default DashboardStore
