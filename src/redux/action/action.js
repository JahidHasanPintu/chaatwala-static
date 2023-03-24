export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}
export const DEL = (index) => {
    return {
        type: "RMV_CART",
        key: index,
    }
}
export const CartUpdate = (index) => {
    return {
        type: "CART_UPDATE",
        value: index,
    }
}
export const catWiseFilter = (index) => {
    return {
        type: "CAT_WISE_FILTER",
        value: index,
    }
}
