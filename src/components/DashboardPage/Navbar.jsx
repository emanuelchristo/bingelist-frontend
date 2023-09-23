import { useState } from 'react'

import DiscoverSvg from '/src/assets/icons/discover.svg?react'
import ShuffleSvg from '/src/assets/icons/shuffle.svg?react'
import SimilarSvg from '/src/assets/icons/similar.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'

import styles from './Navbar.module.css'

export default function Navbar() {
	const [selectedTab, setSelectedTab] = useState(null)

	const navOptions = [
		{ id: 'discover', name: 'Discover', icon: <DiscoverSvg /> },
		{ id: 'search', name: 'Search', icon: <SearchSvg /> },
		{ id: 'random', name: 'Random', icon: <ShuffleSvg /> },
		{ id: 'similar', name: 'Similar', icon: <SimilarSvg /> },
	]

	return (
		<div className={styles['navbar'] + ' card'}>
			<div className={styles['nav-items-wrapper']}>
				{navOptions.map((item) => (
					<NavItem
						key={item.id}
						name={item.name}
						icon={item.icon}
						selected={selectedTab === item.id}
						onClick={() => setSelectedTab(item.id)}
					/>
				))}
			</div>
			<div className={styles['avatar']}>
				<span className={styles['avatar-initials']}>C</span>
			</div>
		</div>
	)
}

function NavItem({ icon, name, selected, onClick }) {
	return (
		<div className={`${styles['nav-item']} ${selected ? styles['selected'] : ''}`} onClick={onClick}>
			{icon}
			<span>{name}</span>
		</div>
	)
}
