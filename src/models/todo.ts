import Client from "../database";

export type Todo = {
    id?: string | number;
    todo: string;
    complete?: boolean;
    date?: Date;
    user_id: string | number;
};

export type ReturnJson = {
    success: boolean;
    msg?: string;
    load?: Todo[] | Todo;
};

export class TodoModel {
    // add todo
    async add(todo: Todo): Promise<ReturnJson> {
        const query =
            "INSERT INTO public.todos(todo, user_id)VALUES ($1, $2) RETURNING *;";

        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [todo.todo, todo.user_id]);
            conn.release();
            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: `could't add todo, err: ${err}`
            };
        }
    }
    // select todos
    async select(user_id: string | number): Promise<ReturnJson> {
        const query = "SELECT * FROM public.todos WHERE user_id=$1;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [user_id]);
            conn.release();
            return {
                success: true,
                load: result.rows
            };
        } catch (err) {
            return {
                success: false,
                msg: `error getting todos ${err}`
            };
        }
    }

    // select todo
    async show(id: string | number): Promise<ReturnJson> {
        const query = "SELECT * FROM public.todos WHERE id=$1;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id]);
            conn.release();
            if (result.rows.length) {
                return {
                    success: true,
                    load: result.rows[0]
                };
            } else {
                return {
                    success: false,
                    msg: `error getting todo`
                };
            }
        } catch (err) {
            return {
                success: false,
                msg: `error getting todos ${err}`
            };
        }
    }

    // toggle todo
    async toggle(id: string | number): Promise<ReturnJson> {
        const query =
            "UPDATE public.todos SET complete= NOT complete WHERE id=$1 RETURNING *;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [id]);
            conn.release();
            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: `Error toggling todo, ${err}`
            };
        }
    }
    // remove todo
    async delete(id: string | number): Promise<ReturnJson> {
        const query = "DELETE FROM public.todos WHERE id=$1;";
        // @ts-ignore
        const conn = await Client.connect();
        await conn.query(query, [id]);
        try {
            return {
                success: true
            };
        } catch (err) {
            return {
                success: false,
                msg: `Error deleting todo: ${err}`
            };
        }
    }
}
