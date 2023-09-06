import { createSSRApp } from 'vue'

export function createApp() {
	return createSSRApp({
		data: () => ({
			name: 'world',
		}),
		template: `
                <div>hello {{name}}</div>
        `,
	})
}
