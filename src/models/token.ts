import Client from "../database";

export type Token = {
    id: string | number;
    refresh: string;
    browser: string | number;
    user_id: string | number;
};

export type ReturnJson = {
    success: boolean;
    code: number;
    load?: Token | [Token];
    id?: string | number;
    msg?: string;
};

export class TokenModel {
    // index
    async index(user_id: string | number) {
        const query = "SELECT * FROM public.tokens WHERE user_id=$1;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [user_id]);
            conn.release();
            if (result.rows.length) {
                return {
                    success: true,
                    code: 1,
                    load: result.rows
                };
            } else {
                return {
                    success: false,
                    code: 3,
                    msg: "tokens not found"
                };
            }
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: `Error select tokens: ${err}`
            };
        }
    }

    // show
    async show(id: string | number): Promise<ReturnJson> {
        const query = "SELECT * FROM public.tokens WHERE id=$1;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id]);
            conn.release();
            if (result.rows.length) {
                return {
                    success: true,
                    code: 1,
                    load: result.rows[0]
                };
            } else {
                return {
                    success: false,
                    code: 3,
                    msg: "tokens not found"
                };
            }
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: `Error select tokens: ${err}`
            };
        }
    }

    // create
    async create(
        refreshToken: string,
        browser: string | number,
        user_id: string | number
    ): Promise<ReturnJson> {
        const query =
            "INSERT INTO public.tokens( refresh, browser, user_id ) VALUES ($1, $2, $3) RETURNING *;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [
                refreshToken,
                browser,
                user_id
            ]);
            conn.release();
            if (!result.rows.length) {
                return {
                    success: false,
                    code: 2,
                    msg: `Error add tokens`
                };
            }

            return {
                success: true,
                code: 1,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: `Error add tokens: ${err}`
            };
        }
    }

    // edit
    async edit(refreshToken: string, id: string | number): Promise<ReturnJson> {
        const query =
            "UPDATE public.tokens SET refresh=$1 WHERE id=$2 RETURNING *;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [refreshToken, id]);
            conn.release();
            if (result.rows.length) {
                return {
                    success: true,
                    code: 1
                };
            } else {
                return {
                    success: false,
                    code: 3,
                    msg: "tokens not found"
                };
            }
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: `Error update tokens: ${err}`
            };
        }
    }

    // delete
    async delete(id: string | number): Promise<ReturnJson> {
        const query = "DELETE FROM public.tokens WHERE id=$1 RETURNING *;";
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id]);
            conn.release();
            if (!result.rows.length) {
                return {
                    success: false,
                    code: 3,
                    msg: `Error delete tokens: Tokens not existed`
                };
            }
            return {
                success: true,
                code: 1
            };
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: `Error delete tokens: ${err}`
            };
        }
    }

    // delete all
    async deleteAll(user_id: string | number): Promise<ReturnJson> {
        const query = "DELETE FROM public.tokens WHERE user_id=$1;";

        try {
            // @ts-ignore
            const conn = await Client.connect();
            await conn.query(query, [user_id]);
            conn.release();
            return {
                success: true,
                code: 1
            };
        } catch (err) {
            return {
                success: false,
                code: 2,
                msg: "Error delete tokens: ${err"
            };
        }
    }
}
