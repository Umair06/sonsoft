import logout from '../../Types/LogoutActionTypes/LogoutActionTypes'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case logout.LOGOUT_USER:
      return { ...state, ...payload }

    default:
      return state
  }
}
