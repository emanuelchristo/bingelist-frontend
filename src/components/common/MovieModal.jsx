import { dashboardStore } from '../../store/stores'

import IconButton from '../common/IconButton'
import CloseSvg from '/src/assets/icons/close.svg?react'
import MovieContent from './MovieContent'

import styles from './MovieModal.module.css'

export default function MovieModal() {
	return (
		<div className={styles['movie-modal'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Movie</span>
				<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelMovieModal} />
			</div>
			<MovieContent />
		</div>
	)
}
