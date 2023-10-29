export function formatMediaType(mediaType) {
	if (mediaType === 'movie') return 'Movie'
	else if (mediaType === 'tv') return 'TV'
	return '--'
}

export function formatRating(rating) {
	if (typeof rating !== 'number') return '--'
	return rating.toFixed(1)
}

export function formatGenres(genres) {
	return '--'
}

export function formatDuration(duration) {
	return '--'
}
