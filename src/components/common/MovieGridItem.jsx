import { formatMediaType, formatRating, formatYear } from '../../utils/movie-format'
import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import RatingIcon from '/src/assets/logos/rating.png'

import { FavButton, WatchedButton, ListButton } from './ControlButtons'

import styles from './MovieGridItem.module.css'

const MovieGridItem = observer(({ data, inList }) => {
	return (
		<div className={styles['movie-grid-item']}>
			<div
				className={styles['poster']}
				style={{ backgroundImage: `url('${data?.poster_path}')` }}
				onClick={() => dashboardStore.showMovieModal({ id: data?.id, media_type: data?.media_type })}
			></div>
			<div className={styles['content']}>
				<div className={styles['controls']}>
					<div className={styles['controls-left']}>
						<FavButton
							fav={dashboardStore.getMovieWaFa({ id: data?.id, media_type: data?.media_type })?.faved}
							onClick={() => dashboardStore.favMovie({ id: data?.id, media_type: data?.media_type })}
						/>
						<WatchedButton
							watched={dashboardStore.getMovieWaFa({ id: data?.id, media_type: data?.media_type })?.watched}
							onClick={() => dashboardStore.watchedMovie({ id: data?.id, media_type: data?.media_type })}
						/>
					</div>
					<ListButton onClick={() => dashboardStore.addToList(data)} />
				</div>
				<div
					className={styles['content-bottom']}
					onClick={() => dashboardStore.showMovieModal({ id: data?.id, media_type: data?.media_type })}
				>
					<span className={styles['title']}>{data?.title ?? '--'}</span>
					<span className={styles['year']}>{formatYear(data?.release_date)}</span>
					<div className='flex items-center gap-[6px]'>
						<div className={styles['tag']}>{formatMediaType(data?.media_type)}</div>
						<div className={styles['dot']}></div>
						<div className={styles['rating-wrapper']}>
							<img src={RatingIcon} />
							<span>{formatRating(data?.vote_average)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

export default MovieGridItem
