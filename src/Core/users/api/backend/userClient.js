const baseAPIURL = 'http://localhost:3000/api/'

export const getUserByID = async userId => {
  const res = await fetch(baseAPIURL + 'user/' + userId, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
  return res
}

export const updateUser = async (userID, newData) => {
  const dataWithOnlineStatus = {
    ...newData,
    lastOnlineTimestamp: Math.round(new Date().getTime() / 1000),
  }

  fetch(baseAPIURL + 'user/' + userID, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ ...dataWithOnlineStatus }),
  })
    .then(response => {
      // console.log(response)
    })
    .catch(error => {
      alert(error)
      console.error(error)
    })
}

export const subscribeCurrentUser = (userId, callback) => {
  fetch(baseAPIURL + 'user/' + userId, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(json => {
      callback(json)
    })
    .catch(error => {
      alert(error)
      console.error(error)
    })
  return null
}
