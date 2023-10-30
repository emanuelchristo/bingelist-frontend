import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import Modal from './Modal'
import MovieContent from './MovieContent'

import CloseSvg from '/src/assets/icons/close.svg?react'
import IconButton from '../common/IconButton'

import styles from './MovieModal.module.css'

const MovieModal = observer(() => {
	return (
		<Modal show={!!dashboardStore.showMovieDetailsModal} onClose={dashboardStore.closeMovieModal}>
			<div className={styles['movie-modal'] + ' card'}>
				<div className={styles['header']}>
					<span className={styles['title']}>Movie</span>
					<IconButton icon={<CloseSvg />} onClick={dashboardStore.closeMovieModal} />
				</div>
				<MovieContent
					data={dashboardStore.movieDetails.details}
					loading={dashboardStore.movieDetails.fetchState !== 'success'}
				/>
			</div>
		</Modal>
	)
})

export default MovieModal
