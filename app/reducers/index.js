import { combineReducers } from 'redux'
import language from './languageReducer'
import metrics from './metricsReducer'

const rootReducer = combineReducers({
  language,
  metrics
})

export default rootReducer
