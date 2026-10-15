import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Fixed API base so endpoint assertions don't depend on a local .env file
globalThis.process.env.VITE_API_URL = 'http://api.test'

// antd's responsive grid calls matchMedia, which jsdom doesn't implement
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})

afterEach(() => {
  cleanup()
})
