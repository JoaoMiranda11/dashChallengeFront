import axios from "axios";
import type { UserAuthData } from "./types";
import { UserData } from "@/types/auth/interface";

const BASE_BACK_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUser(userData: UserAuthData) {
    if (!BASE_BACK_URL) return null;
    return await axios.post(BASE_BACK_URL+"/session", userData, {
        withCredentials: true,
    })
    .then((res) => {
        return res.data as UserData;
    })
    .catch((err) => null)
}