import express from 'express'
import { createApp } from './app'
import { renderToString } from '@vue/server-renderer'

const server = express()

server.use(express.static('.'))

server.get('/', (req, res) => {
	const app = createApp()
	renderToString(app).then(html => {
		res.send(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Taramtiתרמתי - Your source for blood donation information and centers. Learn about the process and benefits of donating blood." />
                <title>Donate Blood | Taramti תרמתי</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script type="module" src="/client.ts"></script>
            </body>
            </html>
`)
	})
})

server.listen(3030, () => {
	console.log('🤖 Server listening on port 3030')
})
