import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../store/stores'
import { Outlet } from 'react-router-dom'
import FiltersPanel from '../components/DashboardPage/FiltersPanel'
import Navbar from '../components/DashboardPage/Navbar'
import WaFaPanel from '../components/DashboardPage/WaFaPanel'
import YourListsPanel from '../components/DashboardPage/YourListsPanel'
import CreateList from '../components/DashboardPage/CreateList'

import styles from './DashboardPage.module.css'

const DashboardPage = observer(() => {
	function getModalComponent() {
		if (dashboardStore.showCreateList) return <CreateList />

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
