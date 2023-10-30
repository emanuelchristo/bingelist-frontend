import { useEffect, useRef } from 'react'

import styles from './Modal.module.css'

export default function Modal({ show, onClose, children }) {
	const modalRef = useRef()
	const contentRef = useRef()

	useEffect(() => {
		function handleMouseDown(e) {
			if (modalRef.current.contains(e.target) && !contentRef.current.contains(e.target)) onClose()
		}

		document.addEventListener('mousedown', handleMouseDown)

		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])

	return (
		<div className={`${styles['modal']} ${show ? styles['show'] : ''}`} ref={modalRef}>
			<div className={styles['content']} ref={contentRef}>
				{children}
			</div>
		</div>
	)
}
