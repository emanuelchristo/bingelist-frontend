import { useEffect } from 'react'
import { dashboardStore } from '../store/stores'

// import Button from '../components/common/Button.jsx'

import styles from './LandingPage.module.css'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function LandingPage() {
	useEffect(() => {
		if (typeof google !== 'undefined') return

		google.accounts.id.initialize({
			client_id: GOOGLE_CLIENT_ID,
			callback: dashboardStore.handleGoogleLogin,
		})

		google.accounts.id.renderButton(
			document.getElementById('google-sign-in-button-div'),
			{ theme: 'outline', size: 'large' } // customization attributes
		)
	}, [google])

	return (
		<div className={styles['landing-page']}>
			<nav className={styles['nav']}>
				<img src='/logo.png' className={styles['logo']} />
				{/* <div className={styles['nav-button-wrapper']} >
					<Button type='primary' name='Sign in' />
				</div> */}
			</nav>
			<div className={styles['hero']}>
				<div className={styles['hero-content']}>
					<div className={styles['left-text-container']}>
						<h1 className={styles['main-heading']}>bingelist</h1>
						<h3 className={styles['sub-heading']}>Organize movies & shows into lists</h3>
						<div className={styles['hero-button-wrapper']} id='google-sign-in-button-div'>
							{/* <Button type='primary' name='Sign in'  /> */}
						</div>
					</div>
					<img className={styles['hero-image']} src='/images/hero-image.webp' />
				</div>
			</div>
		</div>
	)
}
