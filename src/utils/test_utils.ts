import Client from "../database";
import { User } from "../models/user";

// function to reset Id of users after tests
const resetId = async (): Promise<void> => {
    const query = "ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    try {
        // @ts-ignore
        const conn = await Client.connect();
        await conn.query(query);
        conn.release();
    } catch {
        throw new Error("Error connecting to db: ");
    }
};

const userObj: User = {
    id: 1,
    name: "Mohamed Hany",
    email: "medo@medo.com",
    password: "password123",
    gender: 1
};

export { resetId, userObj };
