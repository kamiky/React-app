
import { SET_LOCALE } from '_app/constants/languageConstants'
import { setLocale } from '_app/actions/languageActions'

describe('Redux Actions - language', () => {
  describe('SET_LOCALE', () => {
    it('should be true', () => {
      const result = {
        type: SET_LOCALE,
        locale: 'fr'
      }
      expect(setLocale('fr')).toEqual(result)
    })
  })
})
