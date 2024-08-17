import GamePage from '@/pages/game/game'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'game',
			component: GamePage
		},
		{
			path: '/tasks',
			name: 'tasks',
			component: () => import('@/pages/tasks/tasks')
		},
		{
			path: '/referrals',
			name: 'referrals',
			component: () => import('@/pages/referrals/referrals')
		},
		{
			path: '/:pathMatch(.*)',
			redirect: '/'
		}
	]
})

export default router
