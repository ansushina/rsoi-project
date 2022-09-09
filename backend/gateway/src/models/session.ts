import { UserRole } from "./user";



export interface SessionDto {

    user_role: UserRole; 

    password: string;

    login: string;

}
export interface Session {
    id?: string;
    
    uid: string;

    user_uid: string;

    user_role: UserRole; 

    jwt: string;
}

// CREATE TABLE sessions
// (
//     id                SERIAL PRIMARY KEY,
//     uid uuid        NOT NULL UNIQUE,
//     user_uid uuid        NOT NULL,
//     user_role           VARCHAR(80) NOT NULL,
//     jwt         TEXT NOT NULL
// );