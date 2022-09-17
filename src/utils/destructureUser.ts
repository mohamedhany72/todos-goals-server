import { User } from "../models/user";

const destructureUser = (userFull: User): User => {
    const user: User = (({ id, name, email, gender, picurl, verified }) => ({
        id,
        name,
        email,
        gender,
        picurl,
        verified
    }))(userFull);
    return user;
};

export default destructureUser;
