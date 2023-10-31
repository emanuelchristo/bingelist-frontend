import { useEffect } from 'react'
import { dashboardStore } from '../store/stores'

// import Button from '../components/common/Button.jsx'

import styles from './LandingPage.module.css'

export default function LandingPage() {
	useEffect(() => {
		google.accounts.id.initialize({
			client_id: '524308456980-3d17hpn4h6qhdnn32oap5q52uta8gbsa.apps.googleusercontent.com',
			callback: dashboardStore.handleGoogleLogin,
		})

		google.accounts.id.renderButton(
			document.getElementById('google-sign-in-button-div'),
			{ theme: 'outline', size: 'large' } // customization attributes
		)
	}, [])

	return (
		<div className={styles['landing-page']}>
			<nav className={styles['nav']}>
				<img src='/logo.svg' className={styles['logo']} />
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
					<img className={styles['hero-image']} src='/images/hero-image.png' />
				</div>
			</div>
		</div>
	)
}
