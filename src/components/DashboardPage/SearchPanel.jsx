import { useState } from 'react'

// import IconButton from '../common/IconButton'
import TextBox from '../common/TextBox'
import Tabs from '../common/Tabs'
import MovieGrid from '../common/MovieGrid'

import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './SearchPanel.module.css'

export default function SearchPanel() {
	const [selectedTab, setSelectedTab] = useState('all')

	return (
		<div className={styles['search-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className={styles['title-wrapper']}>
					<span className={styles['header-title']}>Search</span>
					<Tabs
						tabs={[
							{ name: 'All', value: 'all' },
							{ name: 'Movies', value: 'movies' },
							{ name: 'TV Shows', value: 'tv-shows' },
						]}
						selectedTab={selectedTab}
						onChange={setSelectedTab}
					/>
				</div>
				<div className={styles['controls-wrapper']}>
					<TextBox icon={<SearchSvg />} placeholder='Search...' clear={true} onChange={() => {}} />
					{/* <IconButton icon={<GridSvg />} size='lg' /> */}
				</div>
			</div>

			<div className={styles['content']}>
				<MovieGrid movies={[]} />
			</div>
		</div>
	)
}
