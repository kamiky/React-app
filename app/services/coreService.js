

export default {
  isReady: (metrics) => {
    if (metrics.bucket && metrics.servers && metrics.serverSelected &&
      metrics.realTime[metrics.serverSelected] && metrics.appSelected) {
      return true
    }
    return false
  },
}