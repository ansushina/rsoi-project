
export type UserRole = 'admin' | 'user';




export interface User {
    id?: string;

    uid: string;

    user_role: UserRole;

    login: string;

    password: string;
}

// CREATE TABLE users
// (
//     id                SERIAL PRIMARY KEY,
//     uid uuid        NOT NULL,
//     login           VARCHAR(80) NOT NULL UNIQUE,
//     user_role           VARCHAR(80) NOT NULL,
//     password         TEXT
// );