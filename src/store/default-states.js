export const defaults = {
  lists: {
    fetchState: "none",
    favourites: null,
    watched: null,
    yourLists: [],
  },

  discover: {
    fetchState: "none",
    trending: [],
    popular: { tv: [], movies: [] },
    upcoming: { tv: [], movies: [] },
  },

  browse: {
    fetchState: "none",
    movies: [],
    currPage: 1,
    totalPages: 1,
  },

  random: {
    fetchState: "none",
    movie: null,
  },

  movieDetails: {
    fetchState: "none",
    details: null,
  },
}
