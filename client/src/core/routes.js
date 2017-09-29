import * as R from '@views/routes'

console.log('ROUTES: ', R)

import { StringUtils } from '@beautiful-code/string-utils'

export const Routes = {
	home: {
		path: '/',
		label: 'Home',
		exact: true,
		component: R.Home
	},
	about: {
		component: R.About,
		children: {
			bio: {
				path: '/me',
				label: 'My Bio',
				component: R.Bio,
			},
			resume: {
				component: R.Resume
			}
		}
	},
	blog: {
		component: R.Blog.Index,
		children: {
			post: {
				path: '/post/:slug',
				label: 'Post',
				component: R.Blog.Post,
				showInMenus: false
			},
			category: {
				path: '/category/:slug',
				label: 'Category',
				component: R.Blog.Category,
				showInMenus: false

			},
		}
	},
	portfolio: {
		path: '/portfolio',
		component: R.Resume,
		children: {
			websites: {
				component: R.Bio,
			},
			github: {
				label: 'GitHub',
				component: R.About,
			}
		}
	}
}