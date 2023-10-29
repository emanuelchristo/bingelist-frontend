import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import RatingIcon from '/src/assets/logos/rating.png'
import FavOutlineSvg from '/src/assets/icons/fav-outline.svg?react'
import FavFillSvg from '/src/assets/icons/fav-fill.svg?react'
import WatchedOutlineSvg from '/src/assets/icons/watched-outline.svg?react'
import WatchedFillSvg from '/src/assets/icons/watched-fill.svg?react'
import ListRemoveSvg from '/src/assets/icons/list-remove.svg?react'
import ListAddSvg from '/src/assets/icons/list-add.svg?react'

import styles from './MovieGridItem.module.css'

function formatMediaType(mediaType) {
	if (mediaType === 'movie') return 'Movie'
	else if (mediaType === 'tv') return 'TV'
	return '--'
}

function formatRating(rating) {
	if (typeof rating !== 'number') return '--'
	return rating.toFixed(1)
}

const MovieGridItem = observer(({ data, inList }) => {
	function handleListClick() {
		dashboardStore.handleAddToListClick('movieId')
	}

	return (
		<div className={styles['movie-grid-item']}>
			<div
				className={styles['poster']}
				style={{ backgroundImage: `url('${data.poster_path}')` }}
				onClick={() => dashboardStore.handleMovieClick('movieId')}
			></div>
			<div className={styles['content']}>
				<div className={styles['controls']}>
					<div className={styles['controls-left']}>
						<FavButton fav />
						<WatchedButton watched />
					</div>
					<div className={styles['playlist-button']} onClick={handleListClick}>
						{!!inList && <ListRemoveSvg className={styles['playlist-icon']} />}
						{!inList && <ListAddSvg className={styles['playlist-icon']} />}
					</div>
				</div>
				<div className={styles['content-bottom']} onClick={() => dashboardStore.handleMovieClick('movieId')}>
					<span className={styles['title']}>{data.title ?? '--'}</span>
					<span className={styles['year']}>{data.release_date?.slice(0, 4) || '--'}</span>
					<div className='flex items-center gap-[6px]'>
						<div className={styles['tag']}>{formatMediaType(data.media_type)}</div>
						<div className={styles['dot']}></div>
						<div className={styles['rating-wrapper']}>
							<img src={RatingIcon} />
							<span>{formatRating(data.vote_average)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

function FavButton({ fav, onClick }) {
	return (
		<div className={styles['fav-button']} onClick={onClick}>
			{!fav && <FavOutlineSvg className={styles['fav-outline']} />}
			{!!fav && <FavFillSvg className={styles['fav-fill']} />}
		</div>
	)
}

function WatchedButton({ watched, onClick }) {
	return (
		<div className={styles['watched-button']} onClick={onClick}>
			{!watched && <WatchedOutlineSvg className={styles['watched-outline']} />}
			{!!watched && <WatchedFillSvg className={styles['watched-fill']} />}
		</div>
	)
}

export default MovieGridItem
