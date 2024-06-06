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
                ...state.home,
                url: action.payload
            }
        case 'home/getGenres':
            return {
                ...state.home,
                genres: action.payload
            }
        default:
            return state
    }
}

export default homeReducer