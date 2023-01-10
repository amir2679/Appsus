import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import mailApp from './apps/mail/pages/email-app.cmp.js'

import emailList from './apps/mail/cmps/email-list.cmp.js'
import emailDetails from './apps/mail/cmps/email-details.cmp.js'

import keepApp from './apps/keep/cmps/keep-app.cmp.js'
import noteAdd from './apps/keep/cmps/note-add.cmp.js'
import noteDetalis from './apps/keep/cmps/note-detalis.cmp.js'
import keepTrash from './apps/keep/cmps/keep-trash.cmp.js'
import keepCanvas from './apps/keep/cmps/keep-canvas.cmp.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/mail',
			component: mailApp,
			children: [
				{
					path: '/mail/:id?',
					component: emailDetails
				},
			]
		},
		// {
		// 	path: '/keep/trash',
		// 	component: keepTrash
		// },
		{
			path: '/keep/canvas/:id?',
			component: keepCanvas
		},
		{
			path: '/keep',
			component: keepApp,
			children: [
				{
					path: '/keep/:id',
					component: noteDetalis
				},
			]
		},
	]
}


export const router = createRouter(routerOptions)