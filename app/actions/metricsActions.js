import * as types from '_app/constants/metricsConstants'

export const selectApp = (data) => ({
  type: types.SELECT_APP,
  data
})

export const updateBucket = (data) => ({
  type: types.UPDATE_BUCKET,
  data
})

export const updateServers = (data) => ({
  type: types.UPDATE_SERVERS,
  data
})

export const updateRealTime = (data) => ({
  type: types.UPDATE_REALTIME,
  data
})