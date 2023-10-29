import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../store/stores'
import { Outlet } from 'react-router-dom'
import FiltersPanel from '../components/DashboardPage/FiltersPanel'
import Navbar from '../components/DashboardPage/Navbar'
import WaFaPanel from '../components/DashboardPage/WaFaPanel'
import YourListsPanel from '../components/DashboardPage/YourListsPanel'
import CreateList from '../components/DashboardPage/CreateList'
import MovieModal from '../components/common/MovieModal'
import AddToListModal from '../components/common/AddToListModal'
import DeleteList from '../components/DashboardPage/DeleteList'
import QuickSearch from '../components/DashboardPage/QuickSearch'

import styles from './DashboardPage.module.css'

const DashboardPage = observer(() => {
	function getModalComponent() {
		if (dashboardStore.showCreateList) return <CreateList />
		if (dashboardStore.showMovieModal) return <MovieModal />
		if (dashboardStore.showAddToListModal) return <AddToListModal />
		if (dashboardStore.showDeleteList) return <DeleteList />
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
			<div className={`${styles['modal-container']} ${getModalComponent() ? styles['show-modal-container'] : ''}`}>{getModalComponent()}</div>
		</div>
	)
})

export default DashboardPage
