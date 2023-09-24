import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import ListItem from '../common/ListItem'

import styles from './WaFaPanel.module.css'

const WaFaPanel = observer(() => {
	return (
		<div className={styles['wa-fa-panel'] + ' card'}>
			<ListItem
				emoji='✅'
				name='Watched'
				count={432}
				selected={dashboardStore.selectedListId === 'watched'}
				onClick={() => dashboardStore.handleListItemClick('watched')}
			/>
			<ListItem
				emoji='❤️'
				name='Favourites'
				count={10}
				selected={dashboardStore.selectedListId === 'favourites'}
				onClick={() => dashboardStore.handleListItemClick('favourites')}
			/>
		</div>
	)
})

export default WaFaPanel
