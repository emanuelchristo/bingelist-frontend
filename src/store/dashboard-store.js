import { makeAutoObservable } from 'mobx'

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

class DashboardStore {
	lists = [
		{ id: 1, name: 'Thrillers 90s', count: 5, emoji: '🔥' },
		{ id: 2, name: 'Romance', count: 32, emoji: '💗' },
		{ id: 3, name: 'Neo Noir', count: 14, emoji: '🎞️' },
		{ id: 4, name: 'Slow Burn', count: 8, emoji: '✏️' },
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

	showCreateList = false
	showDeleteList = false
	showMovieModal = false
	showAddToListModal = false
	showQuickSearch = false

	deleteListId = null
	addToListMovieId = null
	editListId = null
	quickSearchPromise = null

	popularTab = 'movies'
	upcomingTab = 'movies'

	constructor() {
		makeAutoObservable(this)
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
	getLists = () => {
		const temp = this.lists.filter(() => 1)
		temp.sort((a, b) => a.name.localeCompare(b.name))
		return temp
	}

	getListById = (listId) => {
		return this.lists.find((item) => item.id == listId)
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
		console.log(emoji, title)
		this.showCreateList = false
		const id = Math.floor(Math.random() * 1000000)
		this.lists.push({ id: id, name: title, count: 9, emoji: emoji })
		this.selectedListId = id
	}

	editList = (listId) => {
		this.showCreateList = true
		this.editListId = listId
	}

	cancelEditList = () => {
		this.showCreateList = false
		this.editListId = null
	}

	okEditList = () => {
		this.showCreateList = false
		this.editListId = null
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
		this.deleteListId = null
		this.showDeleteList = false
	}

	// MOVIE
	handleMovieClick = (movieId) => {
		this.showMovieModal = true
	}

	cancelMovieModal = () => {
		this.showMovieModal = false
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

	// DISCOVER PAGE
	handlePopularTabChange = (value) => {
		this.popularTab = value
	}

	handleUpcomingTabChange = (value) => {
		this.upcomingTab = value
	}
}

export default DashboardStore
