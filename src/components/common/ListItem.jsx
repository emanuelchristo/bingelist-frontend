import { useRef, useEffect, useState } from 'react'

import styles from './ListItem.module.css'

export default function ListItem({ emoji, name, count, noHoverAnim, selected, id, onClick }) {
	const itemRef = useRef()

	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		if (selected & !clicked) {
			itemRef.current.scrollIntoView({
				block: 'center',
				inline: 'start',
			})
		} else setClicked(false)
	}, [selected])

	return (
		<div
			className={`${styles['list-item']} ${selected ? styles['selected'] : ''} ${noHoverAnim ? styles['no-hover-anim'] : ''}`}
			onClick={() => {
				setClicked(true)
				onClick()
			}}
			ref={itemRef}
		>
			<div className={styles['emoji-wrapper']}>
				<span>{emoji}</span>
			</div>
			<div className={styles['text-wrapper']}>
				<span className={styles['name']}>{name}</span>
				<span className={styles['count']}>{count + `${count === 1 ? ' item' : ' items'}`}</span>
			</div>
		</div>
	)
}
