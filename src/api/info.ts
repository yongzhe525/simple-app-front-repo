import axios from "axios";

export const getInfoName = () => {
    return axios.get(process.env.REACT_APP_API_ENDPOINT + "/infos/name")
}

export const infoPictureURL = process.env.REACT_APP_API_ENDPOINT + "/infos/picture"

export const putInfoPicture = (pictureForm: FormData) => {
    return axios.put(process.env.REACT_APP_API_ENDPOINT + "/infos/picture", pictureForm, { "headers": { "content-type": "multipart/form-data" } })
}
