import { useEffect, useRef } from 'react'
import { dashboardStore } from '../../store/stores'
import { observer } from 'mobx-react-lite'

import YouTube from 'react-youtube'

import styles from './YoutubePlayer.module.css'

function getYoutubeId(ytUrl) {
	try {
		const url = new URL(ytUrl)
		return url.searchParams.get('v')
	} catch (err) {
		return null
	}
}

const YoutubePlayer = observer(() => {
	const cardRef = useRef()

	useEffect(() => {
		function handleOutsideClick(e) {
			if (cardRef.current && !cardRef.current.contains(e.target)) dashboardStore.closeYoutubePlayer()
		}
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	return (
		<div className={styles['youtube-player'] + ' card'} ref={cardRef}>
			<YouTube
				className={styles['player']}
				videoId={getYoutubeId(dashboardStore.youtubeVideo)}
				opts={{
					width: '100%',
					height: '100%',
					playerVars: {
						autoplay: 1,
					},
				}}
			/>
		</div>
	)
})

export default YoutubePlayer
