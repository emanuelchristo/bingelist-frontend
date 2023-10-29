import { dashboardStore } from '../../store/stores'
import { useRef, useEffect } from 'react'

import SearchSvg from '/src/assets/icons/search.svg?react'

import TextBox from '../common/TextBox'

import styles from './QuickSearch.module.css'

export default function QuickSearch() {
	const cardRef = useRef()

	useEffect(() => {
		function handleOutsideClick(e) {
			if (cardRef.current && !cardRef.current.contains(e.target)) dashboardStore.closeQuickSearch()
		}
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	})

	return (
		<div className={styles['quick-search'] + ' card'} ref={cardRef}>
			<div className={styles['search-wrapper']}>
				<TextBox icon={<SearchSvg />} placeholder='Search...' clear={true} onChange={() => {}} />
			</div>
			<div className={styles['content']}>
				<MovieItem onClick={() => dashboardStore.chooseQuickSearch('movieId')} />
			</div>
		</div>
	)
}

function MovieItem({ onClick }) {
	return (
		<div className={styles['movie-item']} onClick={onClick}>
			<div className={styles['poster']}></div>
			<div className={styles['text-wrapper']}>
				<span className={styles['movie-title']}>Spider-Man: No Way Home</span>
				<div className={styles['infos-wrapper']}>
					<div className={styles['tag']}>Movie</div>
					<div className={styles['dot']}></div>
					<div className={styles['year']}>2023</div>
				</div>
			</div>
		</div>
	)
}
