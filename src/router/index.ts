import GamePage from '@/pages/game/game'
import PvpProfilePage from '@/pages/game/pvp-profile/pvp-profile'
import PvpPage from '@/pages/game/pvp/pvp'
import ReferralsPage from '@/pages/referrals/referrals'
import TaskPage from '@/pages/tasks/[taskId]/task'
import TasksPage from '@/pages/tasks/tasks'

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
					component: PvpPage
				},
				{
					path: 'profile',
					name: RouteName.GamePvpProfile,
					component: PvpProfilePage
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
			component: TasksPage
		},
		{
			path: '/tasks/:taskId',
			name: RouteName.Task,
			component: TaskPage
		},
		{
			path: '/referrals',
			name: RouteName.Referrals,
			component: ReferralsPage
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
