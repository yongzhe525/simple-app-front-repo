import axios from "axios";

export const listHobby = () => {
  return axios.get(process.env.REACT_APP_API_ENDPOINT + "/hobbies")
}

export const createHobby = (name: string) => {
  return axios.post(process.env.REACT_APP_API_ENDPOINT + "/hobbies", {
    name: name
  })
}

export const deleteHobby = (id: number) => {
  return axios.delete(process.env.REACT_APP_API_ENDPOINT + "/hobbies/" + id)
}

export const getRegion = () => {
  return axios.get(process.env.REACT_APP_API_ENDPOINT + "/debugs/region")
}

export const getVersion = () => {
  return axios.get(process.env.REACT_APP_API_ENDPOINT + "/debugs/version")
} 