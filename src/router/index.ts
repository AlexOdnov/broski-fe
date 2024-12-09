import GamePage from '@/pages/game/game'

import { createRouter, createWebHistory } from 'vue-router'

export enum RouteName {
	Game = 'game',
	GamePvp = 'game-pvp',
	GamePvpProfile = 'game-pvp-profile',
	GameFindBro = 'game-find-bro',
	Tasks = 'tasks',
	Task = 'task',
	Referrals = 'referrals'
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/game',
			name: RouteName.Game,
			component: GamePage,
			redirect: { name: RouteName.GamePvpProfile },
			children: [
				{
					path: 'pvp',
					name: RouteName.GamePvp,
					component: () => import('@/pages/game/pvp/pvp')
				},
				{
					path: 'profile',
					name: RouteName.GamePvpProfile,
					component: () => import('@/pages/game/pvp-profile/pvp-profile')
				},
				{
					path: 'find-bro',
					name: RouteName.GameFindBro,
					redirect: { name: RouteName.GamePvpProfile }
					// component: () => import('@/pages/game/find-bro/find-bro')
				}
			]
		},
		{
			path: '/tasks',
			name: RouteName.Tasks,
			component: () => import('@/pages/tasks/tasks')
		},
		{
			path: '/tasks/:taskId',
			name: RouteName.Task,
			component: () => import('@/pages/tasks/[taskId]/task')
		},
		{
			path: '/referrals',
			name: RouteName.Referrals,
			component: () => import('@/pages/referrals/referrals')
		},
		{
			path: '/:pathMatch(.*)',
			redirect: { name: RouteName.GamePvpProfile }
		}
	]
})

router.afterEach(() => {
	const initialHash = sessionStorage.getItem('initialHash')
	if (initialHash) {
		location.hash = initialHash
	}
})

export default router
