import { dashboardStore } from '../store/stores'

import Button from '../components/common/Button.jsx'

import styles from './LandingPage.module.css'

export default function LandingPage() {
	return (
		<div className={styles['landing-page']}>
			<nav className={styles['nav']}>
				<img src='/logo.svg' className={styles['logo']} />
				<div className={styles['nav-button-wrapper']}>
					<Button type='primary' name='Sign in' onClick={dashboardStore.signIn} />
				</div>
			</nav>
			<div className={styles['hero']}>
				<div className={styles['hero-content']}>
					<div className={styles['left-text-container']}>
						<h1 className={styles['main-heading']}>bingelist</h1>
						<h3 className={styles['sub-heading']}>Organize movies & shows into lists</h3>
						<div className={styles['hero-button-wrapper']}>
							<Button type='primary' name='Sign in' onClick={dashboardStore.signIn} />
						</div>
					</div>
					<img className={styles['hero-image']} src='/images/hero-image.png' />
				</div>
			</div>
		</div>
	)
}
