import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'
import { useRef, useEffect, useState } from 'react'

import IconButton from '../common/IconButton'
import CloseSvg from '/src/assets/icons/close.svg?react'
import MovieContent from './MovieContent'

import styles from './MovieModal.module.css'

const MovieModal = observer(() => {
	const cardRef = useRef()

	const [movieDetails, setMovieDetails] = useState(null)

	useEffect(() => {
		dashboardStore.fetchMovieDetails(dashboardStore.movieModalId).then((data) => {
			if (data) setMovieDetails(data)
		})

		function handleOutsideClick(e) {
			if (cardRef.current && !cardRef.current.contains(e.target)) dashboardStore.cancelMovieModal()
		}
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	return (
		<div className={styles['movie-modal'] + ' card'} ref={cardRef}>
			<div className={styles['header']}>
				<span className={styles['title']}>Movie</span>
				<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelMovieModal} />
			</div>
			<MovieContent data={movieDetails} />
		</div>
	)
})

export default MovieModal
