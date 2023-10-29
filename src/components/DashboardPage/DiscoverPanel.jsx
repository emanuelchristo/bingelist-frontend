import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import MovieGrid from '../common/MovieGrid'
import DiscoverSection from '../DiscoverPage/DiscoverSection'

import styles from './DiscoverPanel.module.css'

const DiscoverPanel = observer(() => {
	useEffect(() => {
		dashboardStore.fetchDiscover()
	}, [])

	return (
		<div className={'card ' + styles['discover-panel']}>
			<div className={styles['discover-content']}>
				<DiscoverSection title='🔥 Trending'>
					<MovieGrid movies={dashboardStore.discover?.trending} />
				</DiscoverSection>

				<DiscoverSection
					title='⏳ Upcoming'
					selectedTab={dashboardStore.upcomingTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv' },
					]}
					onChange={dashboardStore.handleUpcomingTabChange}
				>
					<MovieGrid movies={dashboardStore.discover?.trending?.[dashboardStore.upcomingTab]} />
				</DiscoverSection>

				<DiscoverSection
					title='⭐️ Popular'
					selectedTab={dashboardStore.popularTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv' },
					]}
					onChange={dashboardStore.handlePopularTabChange}
				>
					<MovieGrid movies={dashboardStore.discover?.popular?.[dashboardStore.popularTab]} />
				</DiscoverSection>
			</div>
		</div>
	)
})

export default DiscoverPanel
