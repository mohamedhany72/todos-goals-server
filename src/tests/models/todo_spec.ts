import { Todo, TodoModel, ReturnJson } from "../../models/todo";
import { UserModel } from "../../models/user";
import { resetId, userObj } from "../../utils/test_utils";

const userModel = new UserModel();
const model = new TodoModel();

const todoObj: Todo = {
    id: 1,
    todo: "Prepare Lunch",
    complete: false,
    user_id: 1
};

const makeTodo = (result: ReturnJson) => {
    const load: Todo = result.load as unknown as Todo;
    const todo: Todo = (({ id, todo, complete, user_id }) => ({
        id,
        todo,
        complete,
        user_id
    }))(load);
    return todo;
};

describe("Testing Model: Todo", (): void => {
    beforeAll(async (): Promise<void> => {
        resetId();
        // add user here
        await userModel.add(userObj);
    });
    afterAll(async (): Promise<void> => {
        // remove user
        await userModel.delete(1);
        resetId();
    });

    // select method should exist
    it("'select' method should exist", (): void => {
        expect(model.select).toBeDefined();
    });
    // select method should return empty array
    it("'select' method should return empty array", async (): Promise<void> => {
        const result = await model.select(1);
        expect(result.load).toEqual([]);
    });

    // add method should exist
    it("'add' method should exist", (): void => {
        expect(model.add).toBeDefined();
    });
    // add method should add todo
    it("'add' method should add todo", async (): Promise<void> => {
        const result = await model.add(todoObj);
        const todo = makeTodo(result);
        expect(todo).toEqual(todoObj);
    });

    // select method should return the todo
    it("'select' method should return the todo", async (): Promise<void> => {
        const result = await model.select(1);

        const load: Todo[] = result.load as unknown as Todo[];
        const todo: Todo = {
            id: load[0].id,
            todo: load[0].todo,
            complete: load[0].complete,
            user_id: load[0].user_id
        };
        expect(todo).toEqual(todoObj);
    });

    // toggle method should exist
    it("'toggle' method should exist", (): void => {
        expect(model.toggle).toBeDefined();
    });
    // toggle method should toggle the todo
    it("'toggle' method should toggle the todo", async (): Promise<void> => {
        todoObj.complete = true;
        const result = await model.toggle(1);
        const todo = makeTodo(result);
        expect(todo).toEqual(todoObj);
    });

    // delete method should exist
    it("'delete' method should exist", (): void => {
        expect(model.delete).toBeDefined();
    });
    // delete method should remove the todo
    it("'delete' method should remove the todo", async (): Promise<void> => {
        await model.delete(1);
        const result = await model.select(1);
        expect(result.load).toEqual([]);
    });
});
