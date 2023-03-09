
export class UserDto {
    id;
    email;
    role;

    constructor(model: any) {
        this.id = model.id;
        this.email = model.email;
        this. role = model.role
    }
}