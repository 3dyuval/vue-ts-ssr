import { createApp } from './main.ts'

const { app, router } = createApp()

router.isReady().then(() => {
	app.mount('#app')
	console.log('hydrated')
})
