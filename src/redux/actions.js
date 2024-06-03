export const getApiConfiguration = (data) => {
    return {
        type: "home/getApiConfiguration",
        payload: data
    }
}

export const getGenres = (data) => {
    return {
        type: "home/getGenres",
        payload: data
    }
}