import { useSelector } from 'react-redux'

export default useCurrentUser = () => useSelector(state => state.auth.user)
