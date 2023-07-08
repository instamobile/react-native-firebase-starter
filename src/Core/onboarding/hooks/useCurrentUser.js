import { useSelector } from 'react-redux'

const useCurrentUser = () => useSelector(state => state.auth.user)

export default useCurrentUser
