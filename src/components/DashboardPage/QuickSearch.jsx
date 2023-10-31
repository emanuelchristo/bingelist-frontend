import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import Modal from '../common/Modal'
import TextBox from '../common/TextBox'
import Spinner from '../common/Spinner'
import Empty from '../common/Empty'

import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './QuickSearch.module.css'

const QuickSearch = observer(() => {
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('')

	useEffect(() => {
		setLoading(true)
		dashboardStore.fetchQuickSearch(query).then((res) => {
			setLoading(false)
			setResults(res)
		})
	}, [query])

	return (
		<Modal
			show={!!dashboardStore.quickSearchPromise}
			onClose={() => {
				setQuery('')
				setResults([])
				setLoading(false)
				dashboardStore.closeQuickSearch()
			}}
		>
			<div className={styles['quick-search'] + ' card'}>
				<div className={styles['search-wrapper']}>
					<TextBox
						icon={<SearchSvg />}
						placeholder='Search...'
						clear={true}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div className={styles['content']}>
					{loading ? (
						<div className={styles['loader-wrapper']}>
							<Spinner />
						</div>
					) : results?.length > 0 ? (
						<>
							{results.map((item) => (
								<MovieItem
									key={item.media_type + item.id}
									onClick={() => dashboardStore.chooseQuickSearch({ id: item.id, media_type: item.media_type })}
								/>
							))}
						</>
					) : (
						<div className={styles['loader-wrapper']}>
							<Empty />
						</div>
					)}
				</div>
			</div>
		</Modal>
	)
})

export default QuickSearch

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
