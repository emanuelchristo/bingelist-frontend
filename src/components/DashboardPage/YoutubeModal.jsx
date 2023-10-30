import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import Modal from '../common/Modal'
import YouTube from 'react-youtube'

import styles from './YoutubeModal.module.css'

function getYoutubeId(ytUrl) {
	try {
		const url = new URL(ytUrl)
		return url.searchParams.get('v')
	} catch (err) {
		return null
	}
}

const YoutubeModal = observer(() => {
	return (
		<Modal show={!!dashboardStore.youtubeVideo} onClose={dashboardStore.closeYoutubeModal}>
			<div className={styles['youtube-player'] + ' card'}>
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
		</Modal>
	)
})

export default YoutubeModal
