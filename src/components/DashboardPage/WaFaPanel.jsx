import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { dashboardStore } from '../../store/stores'

import ListItem from '../common/ListItem'
import Spinner from '../common/Spinner'

import styles from './WaFaPanel.module.css'

const WaFaPanel = observer(() => {
	const { listId } = useParams()

	return (
		<div className={styles['wa-fa-panel'] + ' card'}>
			{dashboardStore.lists.fetchState === 'success' ? (
				<>
					<Link to={`/dashboard/list/${dashboardStore.lists.watched?.listId}`}>
						<ListItem
							emoji={dashboardStore.lists.watched?.emoji}
							name={dashboardStore.lists.watched?.name}
							count={dashboardStore.lists.watched?.count}
							selected={listId === dashboardStore.lists.watched?.listId}
						/>
					</Link>
					<Link to={`/dashboard/list/${dashboardStore.lists.favourites?.listId}`}>
						<ListItem
							emoji={dashboardStore.lists.favourites?.emoji}
							name={dashboardStore.lists.favourites?.name}
							count={dashboardStore.lists.favourites?.count}
							selected={listId === dashboardStore.lists.favourites?.listId}
						/>
					</Link>
				</>
			) : (
				<div className={styles['loading-wrapper']}>
					<Spinner />
				</div>
			)}
		</div>
	)
})

export default WaFaPanel
