import { getUnixTimeStamp } from '../../../helpers/timeFormat'

export const updateUser = async (userID, newData) => {
  const dataWithOnlineStatus = {
    lastOnlineTimestamp: getUnixTimeStamp(),
  }
  // call your API here
}

export const getUserByID = async userID => {
  // call your API here
}
