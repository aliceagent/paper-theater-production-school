import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build number is the commit count from the initial commit. Vercel clones the
// repository, so git is available at build time; VITE_APP_BUILD_NUMBER overrides
// it for environments without history, and 0 is the last-resort fallback.
function buildNumber() {
  const override = process.env.VITE_APP_BUILD_NUMBER
  if (override && /^\d+$/.test(override)) return override
  try {
    const count = execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    if (/^\d+$/.test(count)) return count
  } catch {
    // no git history available in this environment
  }
  return '0'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(`v1.0.${buildNumber()}`),
  },
})
