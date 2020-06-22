export const initialState = {
  groupsFarms: {
    loading: false,
    error: null,
    data: []
  },
}

export default (state = initialState, { type, payload }) => {
  console.log('reducer', type, payload)
  switch (type) {
    case 'GROUPSFARMS_GET_LOADING':
      return {
        ...state,
        groupsFarms: {
          ...state.groupsFarms,
          loading: true
        }
      };
    case 'GROUPSFARMS_GET_SUCCESS':
      return {
        ...state,
        groupsFarms: {
          ...state.groupsFarms,
          loading: false,
          error: null,
          data: [...payload],
        }
      };
    case 'GROUPSFARMS_GET_ERROR':
      return {
        ...state,
        groupsFarms: {
          ...state.groupsFarms,
          loading: false,
          error: payload.error,
        }
      };

    default:
      return state
  }
}
