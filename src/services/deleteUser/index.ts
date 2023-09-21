import axios from "axios";

const BASE_BACK_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function deleteUser(id: string): Promise<boolean> {
    return axios.delete(BASE_BACK_URL+"/users/"+id, {
        withCredentials: true
    })
    .then((res) => true)
    .catch((err) => false)
}