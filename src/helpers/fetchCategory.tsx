import Api from "../common"

const fetchCategory = async (category: string) => {
    const res = await fetch(Api.categoryWiseProduct.url, {
        method: Api.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({category: category})
    })
    const data = await res.json()
    return data
}

export default fetchCategory