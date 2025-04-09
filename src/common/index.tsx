const domain = `${import.meta.env.VITE_BACKEND_URL}`

const Api = {
    signIn: {
        url: `${domain}/api/signin`,
        method: "post"
    },
    logIn: {
        url: `${domain}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${domain}/api/user-details`,
        method: "get"
    },
    logOut: {
        url: `${domain}/api/logout`,
        method: "get"
    },
    allUser: {
        url: `${domain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${domain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${domain}/api/upload-product`,
        method: "post"
    },
    getProducts: {
        url: `${domain}/api/get-products`,
        method: "get"
    },
    updateProduct: {
        url: `${domain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${domain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${domain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${domain}/api/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${domain}/api/addToCart`,
        method: "post"
    },
    countCart: {
        url: `${domain}/api/countCart`,
        method: "get"
    },
    showCart: {
        url: `${domain}/api/getCart`,
        method: "get"
    },
    updateCart: {
        url: `${domain}/api/updateCart`,
        method: "post"
    },
    deleteFromCart: {
        url: `${domain}/api/deleteProduct`,
        method: "post"
    },
    searchProdct: {
        url: `${domain}/api/searchProduct`,
        method: "get"
    }
}

export default Api