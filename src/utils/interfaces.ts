export interface IUsers {
    first_name: string;
    last_name: string;
    email: string;
    img: string;
    role: Role;
}

export enum Role {
    admin = 'admin',
    member = 'member'
}

export interface User {
    // dynamic key
    [key: string]: IUsers[];
  }