import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'
import { useEffect } from 'react'

import MovieGrid from '../common/MovieGrid'
import IconButton from '../common/IconButton'
import Spinner from '../common/Spinner'
import Button from '../common/Button'

import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './SearchPanel.module.css'

const SearchPanel = observer(() => {
	useEffect(() => {
		dashboardStore.fetchBrowse()
	}, [])

	function handleQuickSearch() {
		dashboardStore.quickSearch().then((data) => {
			dashboardStore.showMovieModal({ id: data.id, media_type: data.media_type })
		})
	}

	return (
		<div className={styles['search-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className={styles['title-wrapper']}>
					<span className={styles['header-title']}>Browse</span>
				</div>
				<div className={styles['controls-wrapper']}>
					<IconButton icon={<SearchSvg />} size='lg' onClick={handleQuickSearch} />
				</div>
			</div>

			<div className={styles['content']}>
				{dashboardStore.browse.movies?.length > 0 ? (
					<>
						<MovieGrid movies={dashboardStore.browse.movies} />
						{dashboardStore.browse?.currPage <= dashboardStore.browse?.totalPages && (
							<div className={styles['load-more-container']}>
								{dashboardStore.browse?.fetchState === 'loading' ? (
									<Spinner />
								) : (
									<div style={{ width: 200 }}>
										<Button type='secondary' name='Load more' onClick={dashboardStore.fetchBrowse} />
									</div>
								)}
							</div>
						)}
					</>
				) : (
					<div className={styles['loader-wrapper']}>
						<Spinner />
					</div>
				)}
			</div>
		</div>
	)
})

export default SearchPanel
