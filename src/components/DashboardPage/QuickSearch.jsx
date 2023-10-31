import { formatMediaType, formatYear } from '../../utils/movie-format'
import { useState, useEffect, useRef } from 'react'
import { dashboardStore } from '../../store/stores'
import { observer } from 'mobx-react-lite'

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
	const [selectedIndex, setSelectedIndex] = useState(-1)

	const searchRef = useRef()

	useEffect(() => {
		setLoading(true)
		dashboardStore.fetchQuickSearch(query).then((res) => {
			setLoading(false)
			setResults(res)
			if (res.length > 0) selectedIndex(0)
			else setSelectedIndex(-1)
		})
	}, [query])

	useEffect(() => {
		if (dashboardStore.quickSearchPromise) {
			searchRef.current.focus()
			setLoading(false)
			setResults([])
			setSelectedIndex(-1)
		}
	}, [dashboardStore.quickSearchPromise])

	function handleKeyDowns(e) {
		const key = e.key

		if (key === 'ArrowUp' || key === 'ArrowDown')
			setSelectedIndex((index) => {
				if (results.length === 0) return -1
				if (key === 'ArrowUp') index -= 1
				else if (key === 'ArrowDown') index += 1

				if (index >= results.length) index = results.length - 1
				if (index < 0) index = 0

				return index
			})
		// Selecting a file
		else if (key === 'Enter') {
			if (results.length < 1) return
			const item = results[selectedIndex]
			dashboardStore.chooseQuickSearch({ id: item.id, media_type: item.media_type })
		}
	}

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
						onKeyDown={handleKeyDowns}
						onChange={(e) => setQuery(e.target.value)}
						ref={searchRef}
					/>
				</div>
				<div className={styles['content']}>
					{loading ? (
						<div className={styles['loader-wrapper']}>
							<Spinner />
						</div>
					) : results?.length > 0 ? (
						<>
							{results.map((item, index) => (
								<MovieItem
									key={item.media_type + item.id}
									data={item}
									selected={selectedIndex === index}
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

function MovieItem({ data, onClick, selected }) {
	return (
		<div className={`${styles['movie-item']} ${selected ? styles['selected'] : ''}`} onClick={onClick}>
			<div className={styles['poster']} style={{ backgroundImage: `url('${data?.poster_path}')` }}></div>
			<div className={styles['text-wrapper']}>
				<span className={styles['movie-title']}>{data?.title ?? '--'}</span>
				<div className={styles['infos-wrapper']}>
					<div className={styles['tag']}>{formatMediaType(data?.media_type)}</div>
					<div className={styles['dot']}></div>
					<div className={styles['year']}>{formatYear(data?.release_date)}</div>
				</div>
			</div>
		</div>
	)
}
