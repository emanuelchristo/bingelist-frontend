import FavOutlineSvg from '/src/assets/icons/fav-outline.svg?react'
import FavFillSvg from '/src/assets/icons/fav-fill.svg?react'
import WatchedOutlineSvg from '/src/assets/icons/watched-outline.svg?react'
import WatchedFillSvg from '/src/assets/icons/watched-fill.svg?react'
import ListRemoveSvg from '/src/assets/icons/list-remove.svg?react'
import ListAddSvg from '/src/assets/icons/list-add.svg?react'

import styles from './ControlButtons.module.css'

export function FavButton({ fav, onClick }) {
	return (
		<div className={styles['fav-button']} onClick={onClick}>
			{!fav && <FavOutlineSvg className={styles['fav-outline']} />}
			{!!fav && <FavFillSvg className={styles['fav-fill']} />}
		</div>
	)
}

export function WatchedButton({ watched, onClick }) {
	return (
		<div className={styles['watched-button']} onClick={onClick}>
			{!watched && <WatchedOutlineSvg className={styles['watched-outline']} />}
			{!!watched && <WatchedFillSvg className={styles['watched-fill']} />}
		</div>
	)
}

export function ListButton({ inList, onClick }) {
	return (
		<div className={styles['playlist-button']} onClick={onClick}>
			{!!inList && <ListRemoveSvg className={styles['playlist-icon']} />}
			{!inList && <ListAddSvg className={styles['playlist-icon']} />}
		</div>
	)
}
