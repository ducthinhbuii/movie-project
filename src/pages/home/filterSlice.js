const initState = {
    url: {},
    genres: {}
}

/*
    name = "home"
 */
const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'home/getApiConfiguration':
            return {
                ...state,
                url: action.payload
            }
        case 'home/getGenres':
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state
    }
}

export default homeReducer