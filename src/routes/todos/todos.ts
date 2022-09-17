import express from "express";
import { TodoModel, Todo } from "../../models/todo";

const model = new TodoModel();

const todos = express.Router();

const getTodos = async (
    _req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;

    const { success, load } = await model.select(user.id as number | string);

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).json({ todos: load });
    return;
};

const addTodo = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;
    const todo = req.body.todo;

    const { success, load } = await model.add({
        todo,
        user_id: user.id
    });

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).json({ todo: load });
    return;
};

const toggleTodo = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;
    const id = req.body.id;

    // console.log(user.id);

    // select todo
    const result = await model.show(id as string | number);

    if (!result.success) {
        res.status(404).send("Todo not found");
        return;
    }

    // console.log((result.load as Todo).user_id)
    // check if user owns the todo
    if (user.id != (result.load as Todo).user_id) {
        res.status(401).send("user is not authorized");
        return;
    }

    // toggle the todo
    const { success, load } = await model.toggle(id);

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).json({ todo: load });
    return;
};

const deleteTodo = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;
    const id = req.body.id;

    // select todo
    const result = await model.show(id as string | number);

    if (!result.success) {
        res.status(404).send("Todo not found");
        return;
    }
    // check if user owns the todo
    if (user.id != (result.load as Todo).user_id) {
        res.status(401).send("user is not authorized");
        return;
    }

    // toggle the todo
    const { success } = await model.delete(id);

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).send("Todo deleted!");
    return;
};

// select all todos
todos.get("/", getTodos);

// add todo
todos.post("/", addTodo);

// toggle todo
todos.put("/", toggleTodo);

// delete todo
todos.delete("/", deleteTodo);

export default todos;
