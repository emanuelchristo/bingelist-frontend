import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import ListItem from '../common/ListItem'

import styles from './WaFaPanel.module.css'

const WaFaPanel = observer(() => {
	const { listId } = useParams()

	return (
		<div className={styles['wa-fa-panel'] + ' card'}>
			<Link to={`/dashboard/list/watched`}>
				<ListItem emoji='✅' name='Watched' count={432} id='watched' selected={listId === 'watched'} />
			</Link>
			<Link to={`/dashboard/list/favourites`}>
				<ListItem emoji='❤️' name='Favourites' count={10} id='favourites' selected={listId === 'favourites'} />
			</Link>
		</div>
	)
})

export default WaFaPanel
