import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Fixed API base so endpoint assertions don't depend on a local .env file
globalThis.process.env.VITE_API_URL = 'http://api.test'

afterEach(() => {
  cleanup()
})
