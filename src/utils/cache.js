export const removeCacheData = (keyPrefix) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in localStorage) {
    if (key.indexOf(keyPrefix) === 0) {
      localStorage.removeItem(key)
    }
  }
}

export const setCacheUser = (user) => {
  localStorage.setItem(`user_${user.id}`, JSON.stringify(user))
  return user
}

export const getCacheUser = (user_id) => {
  const user = localStorage.getItem(`user_${user_id}`)
  return user ? JSON.parse(user) : null
}

export const removeCacheUser = (user_id) => {
  localStorage.removeItem(`user_${user_id}`)
}

export const removeCacheUsers = () => {
  removeCacheData('user_')
}