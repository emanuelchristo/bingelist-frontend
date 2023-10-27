import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import ListItem from '../common/ListItem'

import styles from './WaFaPanel.module.css'

const WaFaPanel = observer(() => {
	const { listId } = useParams()

	return (
		<div className={styles['wa-fa-panel'] + ' card'}>
			<ListItem emoji='✅' name='Watched' count={432} id='watched' selected={listId === 'watched'} />
			<ListItem emoji='❤️' name='Favourites' count={10} id='favourites' selected={listId === 'favourites'} />
		</div>
	)
})

export default WaFaPanel
