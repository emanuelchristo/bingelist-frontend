import { useRef, useEffect } from 'react'

import styles from './ContextMenu.module.css'

export default function ContextMenu({ options, onClick, onClose, show }) {
	const menuRef = useRef()

	useEffect(() => {
		function handleOutsideClick(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) onClose()
		}
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [menuRef, onClose])

	if (!show) return <></>
	else
		return (
			<div className={styles['context-menu']} ref={menuRef}>
				{options.map((item) => (
					<ContextMenuItem key={item.value} icon={item.icon} name={item.name} onClick={() => onClick(item.value)} />
				))}
			</div>
		)
}

function ContextMenuItem({ icon, name, onClick }) {
	return (
		<div className={styles['context-menu-item']} onClick={onClick}>
			<span>{name}</span>
			<div className={styles['icon-wrapper']}>{icon}</div>
		</div>
	)
}
