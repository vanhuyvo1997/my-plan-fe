
export class User {
    name: string = '';
    username: string = '';
    roles: UserRoles[] = [];
    accessToke: string = '';
    expiresAt = '';
}
export enum UserRoles {
    ADMIN = 'ROLE_ADMIN', USER = 'ROLE_USER'
}