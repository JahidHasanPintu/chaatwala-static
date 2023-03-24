import { useState } from "react";
import { postApi, postPublicApi } from "../api/apiCall";
export const CHANGE_PAGE = (paginate, page) => {
    switch (page) {
        case "prev":
            if (paginate?.currentPage > 1) {
                page = paginate?.currentPage - 1;

            }
            break;
        case "next":
            page = paginate?.currentPage + 1;
            if (page > paginate?.lastPage) {
                page = paginate?.lastPage;
            }
            break;
    }
    return page;
}

export const logincheck = () => {
    const userToken = localStorage.getItem('user-token') ? JSON.parse(localStorage.getItem('user-token')) : null;
    return userToken;
}
export const cartData = () => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    return cart;
}

