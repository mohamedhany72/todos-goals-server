import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export type User = {
    id?: string | number;
    name: string;
    email: string;
    password?: string;
    gender: number;
    picurl?: string | null;
    verified?: boolean;
    date?: Date;
};

export type ReturnJson = {
    success: boolean;
    msg?: string;
    load?: User[] | User;
};

export class UserModel {
    // select user
    async select(email: string): Promise<ReturnJson> {
        const query = "SELECT * FROM public.users WHERE email=$1;";
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [email]);
            conn.release();
            let returnedObject: ReturnJson;
            result.rows.length
                ? (returnedObject = {
                      success: true,
                      load: result.rows[0]
                  })
                : (returnedObject = {
                      success: false,
                      msg: "user doesn't exist"
                  });

            return returnedObject;
        } catch (err) {
            return {
                success: false,
                msg: "Error selecting User"
            };
        }
    }

    // add user
    async add(user: User): Promise<ReturnJson> {
        // encrypt password first
        const hash = bcrypt.hashSync(
            user.password + (pepper as string),
            parseInt(saltRounds as string)
        );

        const query =
            "INSERT INTO public.users(\
                        name, email, password, gender)\
                        VALUES ($1, $2, $3, $4) RETURNING *;";
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [
                user.name,
                user.email,
                hash,
                user.gender
            ]);
            conn.release();
            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: err as string
            };
        }
    }

    // verify
    async verify(email: string): Promise<ReturnJson> {
        const query =
            "UPDATE public.users SET verified=TRUE WHERE email=$1 RETURNING *;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [email]);
            if (result.rows.length) {
                return {
                    success: true,
                    msg: "user verified"
                };
            } else {
                return {
                    success: false,
                    msg: "user not found!"
                };
            }
        } catch (err) {
            return {
                success: false,
                msg: `Error verifying user: ${err}`
            };
        }
    }

    // update user
    async update(
        id: string | number,
        name: string,
        gender: number | string,
        picurl: string
    ): Promise<ReturnJson> {
        const query =
            "UPDATE public.users\
                        SET name=$2, gender=$3, picurl=$4\
                        WHERE id=$1 RETURNING *;";

        try {
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id, name, gender, picurl]);
            conn.release();

            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: err as string
            };
        }
    }

    // change password
    async changePassword(
        id: string | number,
        password: string
    ): Promise<ReturnJson> {
        const query =
            "UPDATE public.users SET password=$2 WHERE id=$1 RETURNING *;";
        const hash = bcrypt.hashSync(
            password + (pepper as string),
            parseInt(saltRounds as string)
        );
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id, hash]);
            conn.release();

            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: err as string
            };
        }
    }

    // remove user
    async delete(id: string | number): Promise<ReturnJson> {
        const query = "DELETE FROM public.users WHERE id=$1;";

        try {
            //@ts-ignore
            const conn = await Client.connect();
            await conn.query(query, [id]);
            conn.release();
            return {
                success: true
            };
        } catch (err) {
            return {
                success: false,
                msg: err as string
            };
        }
    }
}
