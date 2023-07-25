import { UserData } from "@/types/auth/interface";

export function getUser(username: string, password: string): UserData | null {
    if (username === "admin@a.com" && password === "admin") {
        return {
            email: "admin@a.com",
            name: "João Miranda",
            id: "1",
            role: "admin",
            thumbnail: ""
        }
    }
    return null;
}