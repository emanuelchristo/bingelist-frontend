import FiltersPanel from '../components/DashboardPage/FiltersPanel'
import Navbar from '../components/DashboardPage/Navbar'
import WaFaPanel from '../components/DashboardPage/WaFaPanel'
import YourListsPanel from '../components/DashboardPage/YourListsPanel'

import styles from './DashboardPage.module.css'

export default function DashboardPage() {
	return (
		<div className={styles['dashboard-page']}>
			<div className={styles['left-section']}>
				<WaFaPanel />
				<YourListsPanel />
			</div>
			<div className={styles['center-section']}>
				<Navbar />
			</div>
			<div className={styles['right-section']}>
				<FiltersPanel />
			</div>
		</div>
	)
}
