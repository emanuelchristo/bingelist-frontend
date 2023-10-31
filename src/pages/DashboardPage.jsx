import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { dashboardStore } from '../store/stores'

import Navbar from '../components/DashboardPage/Navbar'
import WaFaPanel from '../components/DashboardPage/WaFaPanel'
import MovieModal from '../components/common/MovieModal'
import QuickSearch from '../components/DashboardPage/QuickSearch'
import FiltersPanel from '../components/DashboardPage/FiltersPanel'
import YoutubeModal from '../components/DashboardPage/YoutubeModal'
import AddToListModal from '../components/common/AddToListModal'
import YourListsPanel from '../components/DashboardPage/YourListsPanel'
import CreateListModal from '../components/DashboardPage/CreateListModal'
import DeleteListModal from '../components/DashboardPage/DeleteListModal'

import styles from './DashboardPage.module.css'

const DashboardPage = observer(() => {
	useEffect(() => {
		dashboardStore.fetchLists()
		dashboardStore.fetchFilterSettings()
	}, [])

	return (
		<div className={styles['dashboard-page']}>
			<div className={styles['left-section']}>
				<WaFaPanel />
				<YourListsPanel />
			</div>
			<div className={styles['center-section']}>
				<Navbar />
				<Outlet />
			</div>
			<div className={styles['right-section']}>
				<FiltersPanel />
			</div>

			<CreateListModal />
			<DeleteListModal />
			<QuickSearch />
			<MovieModal />
			<AddToListModal />
			<YoutubeModal />
		</div>
	)
})

export default DashboardPage
