import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import MovieGridItem from '../common/MovieGridItem'
import MovieGrid from '../common/MovieGrid'
import DiscoverSection from '../DiscoverPage/DiscoverSection'

import styles from './DiscoverPanel.module.css'

const DiscoverPanel = observer(() => {
	return (
		<div className={'card ' + styles['discover-panel']}>
			<div className={styles['discover-content']}>
				<DiscoverSection title='🔥 Trending'>
					<MovieGrid>
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
					</MovieGrid>
				</DiscoverSection>

				<DiscoverSection
					title='⏳ Upcoming'
					selectedTab={dashboardStore.upcomingTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv-shows' },
					]}
					onChange={dashboardStore.handleUpcomingTabChange}
				>
					<MovieGrid>
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
					</MovieGrid>
				</DiscoverSection>

				<DiscoverSection
					title='⭐️ Popular'
					selectedTab={dashboardStore.popularTab}
					tabs={[
						{ name: 'Movies', value: 'movies' },
						{ name: 'TV Shows', value: 'tv-shows' },
					]}
					onChange={dashboardStore.handlePopularTabChange}
				>
					<MovieGrid>
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
						<MovieGridItem />
					</MovieGrid>
				</DiscoverSection>
			</div>
		</div>
	)
})

export default DiscoverPanel
