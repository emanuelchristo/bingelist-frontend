import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import DiscoverSvg from '/src/assets/icons/discover.svg?react'
import ShuffleSvg from '/src/assets/icons/shuffle.svg?react'
import SimilarSvg from '/src/assets/icons/similar.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './Navbar.module.css'

const Navbar = observer(() => {
	const navOptions = [
		{ id: 'discover', name: 'Discover', icon: <DiscoverSvg />, href: '/dashboard/discover' },
		{ id: 'search', name: 'Search', icon: <SearchSvg />, href: '/dashboard/search' },
		{ id: 'random', name: 'Random', icon: <ShuffleSvg />, href: '/dashboard/random' },
		{ id: 'similar', name: 'Similar', icon: <SimilarSvg />, href: '/dashboard/similar' },
	]

	const location = useLocation()

	return (
		<div className={styles['navbar'] + ' card'}>
			<div className={styles['nav-items-wrapper']}>
				{navOptions.map((item) => (
					<NavItem key={item.id} name={item.name} icon={item.icon} href={item.href} selected={location?.pathname?.startsWith(item.href)} />
				))}
			</div>
			<div className={styles['avatar']}>
				<span className={styles['avatar-initials']}>C</span>
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
