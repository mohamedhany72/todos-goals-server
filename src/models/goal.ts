import Client from "../database";

export type Goal = {
    id?: string | number;
    goal: string;
    date?: Date;
    user_id: string | number;
};

export type ReturnJson = {
    success: boolean;
    msg?: string;
    load?: Goal[] | Goal;
};

export class GoalModel {
    // add goal
    async add(goal: Goal): Promise<ReturnJson> {
        const query =
            "INSERT INTO public.goals(goal, user_id) VALUES ($1, $2) RETURNING *;";
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(query, [goal.goal, goal.user_id]);
            conn.release();
            return {
                success: true,
                load: result.rows[0]
            };
        } catch (err) {
            return {
                success: false,
                msg: `Error adding goal, ${err}`
            };
        }
    }

    // select goals
    async select(user_id: string | number): Promise<ReturnJson> {
        const query = "SELECT * FROM public.goals WHERE user_id=$1;";
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
                msg: `Error selecting goals, ${err}`
            };
        }
    }

    // select goals
    async show(id: string | number): Promise<ReturnJson> {
        const query = "SELECT * FROM public.goals WHERE id=$1;";
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
                    msg: `error getting goal`
                };
            }
        } catch (err) {
            return {
                success: false,
                msg: `Error selecting goals, ${err}`
            };
        }
    }

    // remove goal
    async delete(id: string | number): Promise<ReturnJson> {
        const query = "DELETE FROM public.goals WHERE id=$1;";
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
                msg: `Error deleting goal, ${err}`
            };
        }
    }
}
