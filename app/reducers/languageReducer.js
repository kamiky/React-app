import * as types from '_app/constants/languageConstants'

const initialState = {
  _v: 0,
  locale: 'fr'
}

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
        _v: state._v + 1}
      }
     return state
 }

 export default languageReducer
