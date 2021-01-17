export default function reducer(state={},action)

{
 switch (action.type) {
    case "SET_NEWS_DATA": {
      return { ...state, ...action.payload };
    }
    case "NEWS_REQUEST_TERMINATE": {
      return { ...state, fetching: false, fetched: true, ...action.payload }
    }
    default: {
      return { ...state }
    }

  }
}