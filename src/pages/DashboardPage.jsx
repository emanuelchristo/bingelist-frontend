import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../store/stores'
import { Outlet } from 'react-router-dom'

import FiltersPanel from '../components/DashboardPage/FiltersPanel'
import Navbar from '../components/DashboardPage/Navbar'
import WaFaPanel from '../components/DashboardPage/WaFaPanel'
import YourListsPanel from '../components/DashboardPage/YourListsPanel'
import CreateListModal from '../components/DashboardPage/CreateListModal'
import MovieModal from '../components/common/MovieModal'
import AddToListModal from '../components/common/AddToListModal'
import DeleteListModal from '../components/DashboardPage/DeleteListModal'
import QuickSearch from '../components/DashboardPage/QuickSearch'
import YoutubeModal from '../components/DashboardPage/YoutubeModal'

import styles from './DashboardPage.module.css'

const DashboardPage = observer(() => {
	useEffect(() => {
		dashboardStore.fetchLists()
	}, [])

	function getModalComponent() {
		if (dashboardStore.showAddToListModal) return <AddToListModal />
		if (dashboardStore.showQuickSearch) return <QuickSearch />
		return null
	}

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
			<MovieModal />
			<YoutubeModal />
		</div>
	)
})

export default DashboardPage
