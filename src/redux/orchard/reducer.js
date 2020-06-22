export const initialState = {
  fruitVarieties: {
    loading: false,
    error: null,
    data: {}
  },
  orchardDetails: {
    loading: false,
    error: null,
    data: {}
  },
  orchardList: {
    loading: false,
    error: null,
    data: []
  },
  orchardUpdate: {
    loading: false,
    error: null,
    data: {}
  },
}

export default (state = initialState, { type, payload }) => {
  // console.log('reducer', type, payload)
  switch (type) {
    case 'FRUITVARIETIES_GET_LOADING':
      return {
        ...state,
        fruitVarieties: {
          ...state.fruitVarieties,
          loading: true
        }
      };
    case 'FRUITVARIETIES_GET_SUCCESS':
      return {
        ...state,
        fruitVarieties: {
          ...state.fruitVarieties,
          loading: false,
          error: null,
          data: payload,
        }
      };
    case 'FRUITVARIETIES_GET_ERROR':
      return {
        ...state,
        fruitVarieties: {
          ...state.fruitVarieties,
          loading: false,
          error: payload.error,
        }
      };

    case 'ORCHARDDETAILS_GET_LOADING':
      return {
        ...state,
        orchardDetails: {
          ...state.orchardDetails,
          loading: true
        }
      };
    case 'ORCHARDDETAILS_GET_SUCCESS':
      return {
        ...state,
        orchardDetails: {
          ...state.orchardDetails,
          loading: false,
          error: null,
          data: payload,
        }
      };
    case 'ORCHARDDETAILS_GET_ERROR':
      return {
        ...state,
        orchardDetails: {
          ...state.orchardDetails,
          loading: false,
          error: payload.error,
        }
      };

    case 'ORCHARDLIST_GET_LOADING':
      return {
        ...state,
        orchardList: {
          ...state.orchardList,
          loading: true
        }
      };
    case 'ORCHARDLIST_GET_SUCCESS':
      return {
        ...state,
        orchardList: {
          ...state.orchardList,
          loading: false,
          error: null,
          data: [...payload],
        }
      };
    case 'ORCHARDLIST_GET_ERROR':
      return {
        ...state,
        orchardList: {
          ...state.orchardList,
          loading: false,
          error: payload.error,
        }
      };

    default:
      return state
  }
}
