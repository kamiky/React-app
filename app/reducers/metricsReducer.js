import * as types from '_app/constants/metricsConstants'
import nested from 'nested-props'


const initialState = {
  _v: 0,
  appSelected: null,
  serverSelected: null,
  /* {
    name: '',
    offer: '',
    public_id: '',
    ...
  } */
  bucket: null,

  /* [{
    active: true,
    name: '',
    ip: '',
    ...
  }] */
  servers: null,

  /* {
    [server]: {
      [app1] : {},
      [app2] : {}
    }
  }*/
  realTime: {}
}

const metricsReducer = (state = initialState, action) => {
  var apps, firstServer, firstApp

  switch (action.type) {
    case types.UPDATE_BUCKET:
      return {
        ...state,
        bucket: action.data,
        _v: state._v + 1
      }

    case types.UPDATE_SERVERS:
      const firstServer = nested.get(action.data, '[0].name')
      return {
        ...state,
        servers: action.data,
        serverSelected: state.serverSelected || nested.get(action.data, '[0].name'),
        _v: state._v + 1
      }

    case types.UPDATE_REALTIME:
      try {
        apps = nested.get(action, `data.${state.serverSelected}.apps`)
        firstApp = Object.keys(apps)[0]
      } catch (err) {
        console.log('(warning)', err)
        firstApp = null
      }
      return {
        ...state,
        realTime: action.data,
        appSelected: state.appSelected || firstApp,
        _v: state._v + 1
      }

    case types.SELECT_APP:
      return {
        ...state,
        appSelected: action.data,
        _v: state._v + 1
      }
  }
  return state
}

export default metricsReducer
