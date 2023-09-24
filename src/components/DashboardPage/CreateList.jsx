import { useState } from 'react'
import { dashboardStore } from '../../store/stores'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'
import TitleSvg from '/src/assets/icons/title.svg?react'
import Button from '../common/Button'
import TextBox from '../common/TextBox'

import styles from './CreateList.module.css'

export default function CreateList() {
	const [emoji, setEmoji] = useState('✏️')
	const [title, setTitle] = useState('')

	function handleCancel() {
		dashboardStore.cancelCreateList()
		setEmoji('✏️')
		setTitle('')
	}

	function handleOk() {
		dashboardStore.okCreateList({ emoji, title })
		setEmoji('✏️')
		setTitle('')
	}

	return (
		<div className={styles['create-list'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Create list</span>
				<IconButton icon={<CloseSvg />} onClick={handleCancel} />
			</div>
			<div className={styles['content']}>
				<div className={styles['emoji']}>
					<input maxLength={1} value={emoji} onChange={(e) => setEmoji(e.target.value)} />
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
				<Button type='primary' name='Create' onClick={handleOk} />
			</div>
		</div>
	)
}
