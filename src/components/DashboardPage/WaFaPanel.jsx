import ListItem from '../common/ListItem'

import styles from './WaFaPanel.module.css'

export default function WaFaPanel() {
	return (
		<div className={styles['wa-fa-panel'] + ' card'}>
			<ListItem emoji='✅' name='Watched' count={432} />
			<ListItem emoji='❤️' name='Favourites' count={10} />
		</div>
	)
}
