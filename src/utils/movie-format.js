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
	if (!genres instanceof Array) return '--'

	const temp = genres.map((item) => item.name)
	return temp.join(', ')
}

export function formatDuration(minutes) {
	if (isNaN(minutes) || minutes < 0) {
		return '--'
	}

	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60

	if (hours === 0) {
		return `${remainingMinutes}m`
	} else if (remainingMinutes === 0) {
		return `${hours}h`
	} else {
		return `${hours}h ${remainingMinutes}m`
	}
}
