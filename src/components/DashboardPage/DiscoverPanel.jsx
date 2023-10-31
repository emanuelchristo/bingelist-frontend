import { useEffect, useState } from 'react'
import { dashboardStore } from '../../store/stores'
import { observer } from 'mobx-react-lite'

import DiscoverSection from '../DiscoverPage/DiscoverSection'
import MovieGrid from '../common/MovieGrid'

import styles from './DiscoverPanel.module.css'

const DiscoverPanel = observer(() => {
	const [popularTab, setPopularTab] = useState('movies')
	const [upcomingTab, setUpcomingTab] = useState('movies')

	useEffect(() => {
		dashboardStore.fetchDiscover()
	}, [])

	return (
		<div className={'card ' + styles['discover-panel']}>
			<div className={styles['discover-content']}>
				<DiscoverSection title='🔥 Trending'>
					<MovieGrid
						movies={dashboardStore.discover.trending}
						loading={dashboardStore.discover.fetchState !== 'success'}
					/>
				</DiscoverSection>

				<DiscoverSection
					title='⏳ Upcoming'
					selectedTab={upcomingTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv' },
					]}
					onChange={setUpcomingTab}
				>
					<MovieGrid
						movies={dashboardStore.discover.upcoming[upcomingTab]}
						loading={dashboardStore.discover.fetchState !== 'success'}
					/>
				</DiscoverSection>

				<DiscoverSection
					title='⭐️ Popular'
					selectedTab={popularTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv' },
					]}
					onChange={setPopularTab}
				>
					<MovieGrid
						movies={dashboardStore.discover.popular[popularTab]}
						loading={dashboardStore.discover.fetchState !== 'success'}
					/>
				</DiscoverSection>
			</div>
		</div>
	)
})

export default DiscoverPanel
