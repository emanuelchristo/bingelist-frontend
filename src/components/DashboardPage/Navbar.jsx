import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { dashboardStore } from '../../store/stores'
import { useState } from 'react'

import DiscoverSvg from '/src/assets/icons/discover.svg?react'
import ShuffleSvg from '/src/assets/icons/shuffle.svg?react'
import SimilarSvg from '/src/assets/icons/similar.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'
import SignOutSvg from '/src/assets/icons/sign-out.svg?react'
import ContextMenu from '../common/ContextMenu'

import styles from './Navbar.module.css'

const Navbar = observer(() => {
	const [showMoreMenu, setShowMoreMenu] = useState(false)

	const navOptions = [
		{ id: 'discover', name: 'Discover', icon: <DiscoverSvg />, href: '/dashboard/discover' },
		{ id: 'browse', name: 'Browse', icon: <SearchSvg />, href: '/dashboard/browse' },
		{ id: 'random', name: 'Random', icon: <ShuffleSvg />, href: '/dashboard/random' },
		{ id: 'similar', name: 'Similar', icon: <SimilarSvg />, href: '/dashboard/similar' },
	]

	const location = useLocation()

	function handleMenuClick(value) {
		setShowMoreMenu(false)
		if (value === 'sign-out') dashboardStore.signOut()
	}

	return (
		<div className={styles['navbar'] + ' card'}>
			<div className={styles['nav-items-wrapper']}>
				{navOptions.map((item) => (
					<NavItem
						key={item.id}
						name={item.name}
						icon={item.icon}
						href={item.href}
						selected={location?.pathname?.startsWith(item.href)}
					/>
				))}
			</div>
			<div className={styles['more-container']}>
				<div className={styles['avatar']} onClick={() => setShowMoreMenu(true)}>
					<span className={styles['avatar-initials']}>C</span>
				</div>
				<div className={styles['more-menu-wrapper']}>
					<ContextMenu
						options={[{ icon: <SignOutSvg />, name: 'Sign out', value: 'sign-out' }]}
						show={showMoreMenu}
						onClick={handleMenuClick}
						onClose={() => setShowMoreMenu(false)}
					/>
				</div>
			</div>
		</div>
	)
})

export default Navbar

function NavItem({ icon, name, selected, onClick, href }) {
	return (
		<Link to={href}>
			<div className={`${styles['nav-item']} ${selected ? styles['selected'] : ''}`} onClick={onClick}>
				{icon}
				<span>{name}</span>
			</div>
		</Link>
	)
}
