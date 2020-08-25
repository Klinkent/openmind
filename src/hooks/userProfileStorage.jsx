const UserProfile = (function () {
  let userData = {}

  const getUserData = function () {
    if (!userData) {
      userData = JSON.parse(localStorage.getItem('userData'))
    }
    return userData
  }

  const setUserData = function (userData) {
    localStorage.setItem('userData', JSON.stringify(userData))
    userData = JSON.parse(localStorage.getItem('userData'))
  }

  return {
    getUserData,
    setUserData,
  }
})()

export default UserProfile
