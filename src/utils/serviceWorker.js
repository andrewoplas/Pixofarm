import Promise from 'bluebird'

export async function cleanupOldRegistrations() {
  // Cleanup old service worker registrations
  if (navigator.serviceWorker) {
    await Promise.mapSeries(
      navigator.serviceWorker.getRegistrations(),
      r => r.unregister()
    )
  }
}
