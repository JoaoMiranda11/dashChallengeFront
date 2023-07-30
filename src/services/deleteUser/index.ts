import axios from "axios";

const BASE_BACK_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function deleteUser(id: string): Promise<boolean> {
    return axios.delete(BASE_BACK_URL+"/users/"+id)
    .then((res) => true)
    .catch((err) => false)
}