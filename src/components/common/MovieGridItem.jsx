import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'
import RtFresh from '/src/assets/logos/rt-fresh.svg'

import styles from './MovieGridItem.module.css'

const MovieGridItem = observer(({ width }) => {
	return (
		<div className={styles['movie-grid-item']} onClick={() => dashboardStore.handleMovieClick('movieId')} style={{ width: width }}>
			<div className={styles['poster']}></div>
			<div className={styles['content']}>
				{/* <div className={styles['controls']}>
					<div className={styles['controls-left']}></div>
				</div> */}
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
	)
})

export default MovieGridItem
