import { observer } from 'mobx-react-lite'
import { useState, useRef, useEffect } from 'react'
import { dashboardStore } from '../../store/stores'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'
import TitleSvg from '/src/assets/icons/title.svg?react'
import Button from '../common/Button'
import TextBox from '../common/TextBox'

import styles from './CreateList.module.css'

const CreateList = observer(() => {
	const cardRef = useRef()

	const [emoji, setEmoji] = useState('✏️')
	const [title, setTitle] = useState('')

	useEffect(() => {
		function handleOutsideClick(e) {
			if (cardRef.current && !cardRef.current.contains(e.target)) handleCancel()
		}
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	useEffect(() => {
		if (!dashboardStore.editListId) return
		const currList = dashboardStore.getListById(dashboardStore.editListId)
		setEmoji(currList.emoji)
		setTitle(currList.name)
	}, [dashboardStore.editListId])

	function handleCancel() {
		if (dashboardStore.editListId) dashboardStore.cancelEditList()
		else dashboardStore.cancelCreateList()

		setEmoji('✏️')
		setTitle('')
	}

	function handleOk() {
		if (dashboardStore.editListId) dashboardStore.okEditList({ emoji, title })
		else dashboardStore.okCreateList({ emoji, title })

		setEmoji('✏️')
		setTitle('')
	}

	return (
		<div className={styles['create-list'] + ' card'} ref={cardRef}>
			<div className={styles['header']}>
				<span className={styles['title']}>{dashboardStore.editListId ? 'Edit list' : 'Create list'}</span>
				<IconButton icon={<CloseSvg />} onClick={handleCancel} />
			</div>
			<div className={styles['content']}>
				<div className={styles['emoji']}>
					<input value={emoji} onChange={(e) => setEmoji(e.target.value)} />
				</div>
				<TextBox
					icon={<TitleSvg />}
					placeholder='Title'
					value={title}
					focus
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className={styles['buttons-wrapper']}>
				<Button type='secondary' name='Cancel' onClick={handleCancel} />
				<Button type='primary' name={dashboardStore.editListId ? 'Save' : 'Create'} onClick={handleOk} />
			</div>
		</div>
	)
})

export default CreateList
