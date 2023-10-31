import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'
import { useState, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'

import Modal from '../common/Modal'
import Button from '../common/Button'
import Spinner from '../common/Spinner'
import TextBox from '../common/TextBox'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'
import TitleSvg from '/src/assets/icons/title.svg?react'

import styles from './CreateListModal.module.css'

const CreateList = observer(() => {
	const [emoji, setEmoji] = useState('✏️')
	const [title, setTitle] = useState('')
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)

	const textBoxRef = useRef()

	useEffect(() => {
		if (dashboardStore.showCreateList) textBoxRef.current.focus()
	}, [dashboardStore.showCreateList])

	useEffect(() => {
		if (!dashboardStore.editListId) return
		const currList = dashboardStore.getListById(dashboardStore.editListId)
		setEmoji(currList.emoji)
		setTitle(currList.name)
	}, [dashboardStore.editListId])

	function handleCancel() {
		if (dashboardStore.editListId) dashboardStore.cancelEditList()
		else dashboardStore.cancelCreateList()

		setShowEmojiPicker(false)
		setEmoji('✏️')
		setTitle('')
	}

	function handleOk() {
		if (dashboardStore.editListId) dashboardStore.okEditList({ emoji, title })
		else dashboardStore.okCreateList({ emoji, title })
	}

	return (
		<Modal show={dashboardStore.showCreateList} onClose={handleCancel}>
			<div className={styles['create-list'] + ' card'}>
				<div className={styles['header']}>
					<span className={styles['title']}>{dashboardStore.editListId ? 'Edit list' : 'Create list'}</span>
					<IconButton icon={<CloseSvg />} onClick={handleCancel} />
				</div>
				<div className={styles['content']}>
					<div className={styles['emoji-wrapper']} onClick={() => setShowEmojiPicker(true)}>
						<span className={styles['emoji']}>{emoji}</span>
						{/* <input value={emoji} onChange={(e) => setEmoji(e.target.value)} /> */}
						{showEmojiPicker && (
							<div className={styles['emoji-picker-wrapper']}>
								<EmojiPicker
									theme='dark'
									previewConfig={{ showPreview: false }}
									skinTonesDisabled={true}
									width={300}
									height={400}
									onEmojiClick={(obj) => {
										setEmoji(obj.emoji)
										setShowEmojiPicker(false)
									}}
								/>
							</div>
						)}
					</div>

					<TextBox
						icon={<TitleSvg />}
						placeholder='Title'
						value={title}
						focus
						onChange={(e) => setTitle(e.target.value)}
						ref={textBoxRef}
					/>
					{dashboardStore.createListState === 'loading' && (
						<div className={styles['loader-wrapper']}>
							<Spinner />
						</div>
					)}
				</div>
				<div className={styles['buttons-wrapper']}>
					<Button type='secondary' name='Cancel' onClick={handleCancel} />
					<Button
						type='primary'
						disabled={title.length === 0}
						name={dashboardStore.editListId ? 'Save' : 'Create'}
						onClick={handleOk}
					/>
				</div>
			</div>
		</Modal>
	)
})

export default CreateList
