import fuzzy from 'fuzzy'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { dashboardStore } from '../../store/stores'
import { useState, useEffect } from 'react'

// import GridSvg from '/src/assets/icons/grid.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'
import EditSvg from '/src/assets/icons/edit.svg?react'
import MoreSvg from '/src/assets/icons/more.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'
import DeleteSvg from '/src/assets/icons/delete.svg?react'

import Spinner from '../common/Spinner'
import TextBox from '../common/TextBox'
import MovieGrid from '../common/MovieGrid'
import IconButton from '../common/IconButton'
import ContextMenu from '../common/ContextMenu'

import styles from './ListPanel.module.css'

const ListPanel = observer(() => {
	const { listId } = useParams()
	const [showMoreMenu, setShowMoreMenu] = useState(false)
	const [displayedMovies, setDisplayedMovies] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		if (!listId) return
		dashboardStore.fetchListDetials(listId)
	}, [listId])

	function handleMenuClick(value) {
		setShowMoreMenu(false)
		if (value === 'delete') dashboardStore.deleteList(listId)
		else if (value === 'edit') dashboardStore.editList(listId)
	}

	function handleAddMovie() {
		dashboardStore.quickSearch().then((movie) => {
			dashboardStore.addOneMovieToList(movie, listId)
		})
	}

	function filterMovie(movie, filters, active) {
		if (!filters || !active) return true

		// console.log(JSON.stringify(movie))

		if (filters.adult === false && movie.adult === true) return false

		if (filters.duration !== 'any') {
			try {
				const duration = JSON.parse(filters.duration)
				if (duration.max !== 'any' && movie.duration > duration.max) return false
				if (duration.min !== 'any' && movie.duration < duration.min) return false

				if ((duration.max !== 'any' || duration.min !== 'any') && isNaN(parseInt(movie.duration))) return false
			} catch (err) {}
		}

		if (filters.language !== 'any' && movie.language !== filters.language) return false

		if (movie.vote_average < filters.minRating) return false

		const movieYear = parseInt(movie.release_date.slice(0, 4))
		if (filters.yearFrom !== 'any' && movieYear < filters.yearFrom) return false
		if (filters.yearTo !== 'any' && movieYear > filters.yearTo) return false

		if (!(filters.type === 'any' || filters.type === 'all') && movie.media_type !== filters.type) return false

		if (filters.genres.length > 0) {
			let hasCommon = false
			for (let genreId of movie.genre_ids) {
				if (filters.genres.includes(genreId)) {
					hasCommon = true
					break
				}
			}
			if (!hasCommon) return false
		}

		return true
	}

	useEffect(() => {
		if (!dashboardStore.listDetails?.movies) {
			setDisplayedMovies([])
			return
		}

		const filteredMovies = dashboardStore.listDetails.movies.filter((movie) =>
			filterMovie(movie, dashboardStore.appliedListFilters, dashboardStore.listFiltersActive)
		)

		const results = fuzzy.filter(searchQuery, filteredMovies, {
			extract: (item) => item.title,
		})

		const extracted = results.map((item) => item.original)

		const sort = dashboardStore.appliedListFilters?.sort

		if (sort === 'popularity.desc') {
			extracted.sort((a, b) => {
				return a.popularity < b.popularity ? 1 : -1
			})
		} else if (sort === 'primary_release_date.desc') {
			extracted.sort((a, b) => {
				return b.release_date.localeCompare(a.release_date)
			})
		} else if (sort === 'last-added') {
			extracted.sort((a, b) => {
				return b.added_at.localeCompare(a.added_at)
			})
		}

		setDisplayedMovies(extracted)
	}, [dashboardStore.listDetails, searchQuery, dashboardStore.appliedListFilters, dashboardStore.listFiltersActive])

	return (
		<div className={styles['list-panel'] + ' card'}>
			{dashboardStore.listDetailsState !== 'success' ? (
				<div className={styles['loader-wrapper']}>
					<Spinner />
				</div>
			) : (
				<>
					<div className={styles['header']}>
						<div className={styles['list-heading']}>
							<div className={styles['emoji-wrapper']}>
								<span>{dashboardStore.getListById(listId)?.emoji ?? '❌'}</span>
							</div>
							<div className={styles['text-wrapper']}>
								<span className={styles['name']}>{dashboardStore.getListById(listId)?.name ?? '--'}</span>
								<span className={styles['count']}>{`${dashboardStore.getListById(listId)?.count ?? '--'} ${
									dashboardStore.getListById(listId)?.count === 1 ? 'item' : 'items'
								}`}</span>
							</div>
							{!(
								dashboardStore.listDetails?.listId === dashboardStore.user?.fav_lid ||
								dashboardStore.listDetails?.listId === dashboardStore.user?.watch_lid
							) && (
								<div className={styles['more-container']}>
									<IconButton icon={<MoreSvg />} onClick={() => setShowMoreMenu(true)} />
									<div className={styles['more-menu-wrapper']}>
										<ContextMenu
											options={[
												{
													icon: <DeleteSvg />,
													name: 'Delete',
													value: 'delete',
												},
												{ icon: <EditSvg />, name: 'Edit', value: 'edit' },
											]}
											show={showMoreMenu}
											onClick={handleMenuClick}
											onClose={() => setShowMoreMenu(false)}
										/>
									</div>
								</div>
							)}
						</div>
						<div className={styles['controls-wrapper']}>
							<TextBox
								icon={<SearchSvg />}
								placeholder='Search...'
								value={searchQuery}
								clear={true}
								onClear={() => setSearchQuery('')}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{/* <IconButton icon={<GridSvg />} size='lg' /> */}
							<IconButton icon={<AddSvg />} size='lg' onClick={handleAddMovie} />
						</div>
					</div>
					<div className={styles['movie-grid-wrapper']}>
						<MovieGrid movies={displayedMovies} />
					</div>
				</>
			)}
		</div>
	)
})

export default ListPanel
