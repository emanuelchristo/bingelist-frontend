export const defaults = {
	lists: {
		fetchState: 'none',
		favourites: null,
		watched: null,
		yourLists: [],
	},

	discover: {
		fetchState: 'none',
		trending: [],
		popular: { tv: [], movies: [] },
		upcoming: { tv: [], movies: [] },
	},

	movieDetails: {
		fetchState: 'none',
		details: null,
	},
}
