export type UserData = {
    name: string;
    email: string;
    id: string;
    role: "admin" | "user";
    thumbnail: string;
}

export type Session = {
    status: "authenticated";
    data: UserData;
} | {
    status: "loading" | "unauthenticated";
    data: null;
}