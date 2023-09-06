import { createSSRApp } from 'vue'
import { createRouter } from './router.ts'

export function createApp() {
	const app = createSSRApp({
		data: () => ({
			name: 'world',
		}),
		template: `
                <div>hello {{name}}</div>
        `,
	})

	const router = createRouter()

	app.use(router)

	return { app, router }
}
