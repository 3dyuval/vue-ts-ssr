import { createServer as createViteServer } from 'vite'
import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

async function createServer() {
	const app = express()

	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom',
	})

	app.use(vite.middlewares)

	app.use('*', async (req, res, next) => {
		const url = req.originalUrl

		try {
			let template = fs.readFileSync(
				path.resolve(__dirname, 'index.html'),
				'utf-8'
			)

			template = await vite.transformIndexHtml(url, template)

			const { render } = await vite.ssrLoadModule('/src/entry-server.ts')

			const app = await render(url)

			const html = template.replace(`<!-- ssr-outlet -->`, app.html)

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
		} catch (e) {
			vite.ssrFixStacktrace(e)
			next(e)
		}
	})

	app.listen(3030, () => {
		console.log('🤖 Server listening on port 3030')
	})
}

createServer()
