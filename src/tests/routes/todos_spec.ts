import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";
import { createVerifyToken } from "../../utils/createTokens";
import { userObj } from "../../utils/test_utils";
import { Todo } from "../../models/todo";

const request = supertest(app);

const validEmail = "medo.elshazly14@gmail.com";
const validPswd = "AAbb00--";
const mainRoute = "/api/todos/";

const todo: Todo = {
    id: 1,
    todo: "Buy Milk!",
    complete: false,
    user_id: 1
};

let access: string,
    badAccess: string,
    browser: string,
    csrfCookie: string,
    csrfToken: string,
    verifyToken: string,
    user: User;
describe("Testing Routes: Todos", (): void => {
    beforeAll(async (): Promise<void> => {
        // create new user
        const name = userObj.name;
        const email = validEmail;
        const gender = userObj.gender;
        const pswd = validPswd;
        const cpswd = validPswd;

        await request
            .post("/api/users/register")
            .send({
                name,
                email,
                gender,
                pswd,
                cpswd
            })
            .expect((res) => {
                access = "Bearer " + res.body.access;
                badAccess = access + "inavlid";
                browser = res.body.browser;
                verifyToken = createVerifyToken(res.body.user);
                user = res.body.user;
                todo.user_id = user.id as string | number;
            });

        await request
            .get("/api/users/csrf")
            .set("Authorization", access)
            .expect((res) => {
                csrfToken = res.body.csrfToken;
                csrfCookie = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
            });
    });

    afterAll(async (): Promise<void> => {
        await request
            .delete("/api/users/delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: validPswd,
                confirmMsg: "I want to delete my account"
            });
    });

    it("test 'get' with bad access", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", badAccess);
        expect(response.status).toBe(403);
    });

    it("test 'get' without verification", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(401);
        expect(response.text).toBe("User is not verified");
    });

    it("verify user", async (): Promise<void> => {
        const response = await request.get(`/api/users/verify/${verifyToken}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe("User verified!");
    });

    it("test 'get todo' after verification", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.todos).toEqual([]);
    });

    // add todo
    it("test 'add todo' ", async (): Promise<void> => {
        const response = await request
            .post(mainRoute)
            .set("Authorization", access)
            .send({
                todo: todo.todo
            })
            .expect((res) => {
                todo.id = res.body.todo.id;
                todo.date = res.body.todo.date;
            });
        expect(response.status).toBe(200);
        expect(response.body.todo).toEqual(todo);
    });

    it("test 'get' should return the todo in array", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.todos).toEqual([todo]);
    });

    it("test 'toggle todo' that don't exist", async (): Promise<void> => {
        const response = await request
            .put(mainRoute)
            .set("Authorization", access)
            .send({
                id: (todo.id as number) + 1
            });
        expect(response.status).toBe(404);
    });

    it("test 'toggle todo' that exists", async (): Promise<void> => {
        const response = await request
            .put(mainRoute)
            .set("Authorization", access)
            .send({
                id: todo.id
            });
        expect(response.status).toBe(200);
    });

    it("test 'delete todo' that don't exist", async (): Promise<void> => {
        const wrongID = (todo.id as number) + 1;
        const response = await request
            .delete(`${mainRoute}/${wrongID}`)
            .set("Authorization", access);
        expect(response.status).toBe(404);
    });

    it("test 'delete todo' that exists", async (): Promise<void> => {
        const response = await request
            .delete(`${mainRoute}/${todo.id}`)
            .set("Authorization", access);
        expect(response.status).toBe(200);
    });

    it("test 'get todo' should return empty array", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.todos).toEqual([]);
    });
});
