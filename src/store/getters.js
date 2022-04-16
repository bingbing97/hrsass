const getters = {
  avatar: (state) => state.app.avatar,
  name: (state) => state.app.name,
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  // eslint-disable-next-line no-dupe-keys
  name: (state) => state.user.UserInfo.username,
  userId: (state) => state.user.UserInfo.userId,
  userPhoto: (state) => state.user.UserInfo.staffPhoto
}
export default getters
