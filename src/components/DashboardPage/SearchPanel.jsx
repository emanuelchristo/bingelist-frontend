import { useState } from 'react'

// import IconButton from '../common/IconButton'
import TextBox from '../common/TextBox'
import Tabs from '../common/Tabs'
import MovieGrid from '../common/MovieGrid'
import IconButton from '../common/IconButton'

import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './SearchPanel.module.css'
import { dashboardStore } from '../../store/stores'

export default function SearchPanel() {
	const [searchQuery, setSearchQuery] = useState('')
	// const [selectedTab, setSelectedTab] = useState('all')
	const [pageNo, setPageNo] = useState(0)
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)

	function handleSearch() {
		dashboardStore.fetchSearch(searchQuery, selectedTab, pageNo).then((data) => {
			if (data) setMovies([...movies, ...data])
		})
	}

	return (
		<div className={styles['search-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className={styles['title-wrapper']}>
					<span className={styles['header-title']}>Search</span>
					{/* <Tabs
						tabs={[
							{ name: 'All', value: 'all' },
							{ name: 'Movies', value: 'movies' },
							{ name: 'TV Shows', value: 'tv' },
						]}
						selectedTab={selectedTab}
						onChange={setSelectedTab}
					/> */}
				</div>
				<div className={styles['controls-wrapper']}>
					<TextBox
						placeholder='Search...'
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value)
						}}
					/>
					<IconButton icon={<SearchSvg />} size='lg' onClick={handleSearch} />
				</div>
			</div>

			<div className={styles['content']}>
				<MovieGrid movies={movies} loading={loading} />
			</div>
		</div>
	)
}
