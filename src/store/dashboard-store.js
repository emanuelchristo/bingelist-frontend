import { makeAutoObservable } from 'mobx'

class DashboardStore {
	lists = [
		{ id: 1, name: 'Thrillers 90s', count: 5, emoji: '🔥' },
		{ id: 2, name: 'Romance', count: 32, emoji: '💗' },
		{ id: 3, name: 'Neo Noir', count: 14, emoji: '🎞️' },
		{ id: 4, name: 'Slow Burn', count: 8, emoji: '✏️' },
	]

	selectedListId = null
	selectedTabId = null

	showCreateList = false

	constructor() {
		makeAutoObservable(this)
	}

	// COMMON
	resetSelected = () => {
		this.selectedListId = null
		this.selectedTabId = null
	}

	// TABS
	handleTabClick = (tabId) => {
		this.resetSelected()
		this.selectedTabId = tabId
	}

	// LISTS
	handleListItemClick = (listId) => {
		this.resetSelected()
		this.selectedListId = listId
	}

	createNewList = () => {
		this.showCreateList = true
	}

	cancelCreateList = () => {
		this.showCreateList = false
	}

	okCreateList = ({ emoji, title }) => {
		console.log(emoji, title)
		this.showCreateList = false
		const id = Math.floor(Math.random() * 1000000)
		this.lists.push({ id: id, name: title, count: 9, emoji: emoji })
		this.selectedListId = id
	}
}

export default DashboardStore
