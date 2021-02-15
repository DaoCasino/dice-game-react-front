import { App } from './app/App'

const app = new App()

declare global {
  interface Window {
    app: any
  }
}

window.app = app || {}

document.addEventListener('DOMContentLoaded', async () => {
  await app.init()
})
