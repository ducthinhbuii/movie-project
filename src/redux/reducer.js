import homeReducer from "../pages/home/filterSlice" 

const rootReducer = (state, action) => {
    return {
        home: homeReducer(state, action)
    }
}

export default rootReducer