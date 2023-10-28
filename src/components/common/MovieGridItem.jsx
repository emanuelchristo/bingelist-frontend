import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import RtFresh from '/src/assets/logos/rt-fresh.svg'
import FavOutlineSvg from '/src/assets/icons/fav-outline.svg?react'
import FavFillSvg from '/src/assets/icons/fav-fill.svg?react'
import WatchedOutlineSvg from '/src/assets/icons/watched-outline.svg?react'
import WatchedFillSvg from '/src/assets/icons/watched-fill.svg?react'
import ListRemoveSvg from '/src/assets/icons/list-remove.svg?react'
import ListAddSvg from '/src/assets/icons/list-add.svg?react'

import styles from './MovieGridItem.module.css'

const MovieGridItem = observer(({ width }) => {
	function handleListClick() {
		dashboardStore.handleAddToListClick('movieId')
	}

	return (
		<div className={styles['movie-grid-item']} style={{ width: width }}>
			<div className={styles['poster']} onClick={() => dashboardStore.handleMovieClick('movieId')}></div>
			<div className={styles['content']}>
				<div className={styles['controls']}>
					<div className={styles['controls-left']}>
						<FavButton fav />
						<WatchedButton watched />
					</div>
					<div className={styles['playlist-button']} onClick={handleListClick}>
						{/* <ListRemoveSvg className={styles['playlist-icon']} /> */}
						<ListAddSvg className={styles['playlist-icon']} />
					</div>
				</div>
				<div className={styles['content-bottom']} onClick={() => dashboardStore.handleMovieClick('movieId')}>
					<span className={styles['title']}>Blue Beetle</span>
					<span className={styles['year']}>2023</span>
					<div className='flex items-center gap-[6px]'>
						<div className={styles['tag']}>Movie</div>
						<div className={styles['dot']}></div>
						<div className={styles['rating-wrapper']}>
							<img src={RtFresh} />
							<span>75%</span>
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
