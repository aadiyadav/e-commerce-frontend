const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "mern_product")

    const dataRes = await fetch(url, {
        method: "post",
        body: formData
    })

    return dataRes.json()
}

export default uploadImage