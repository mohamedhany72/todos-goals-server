import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";
import { createVerifyToken } from "../../utils/createTokens";
import { userObj } from "../../utils/test_utils";
import { Goal } from "../../models/goal";

const request = supertest(app);

const validEmail = "medo.elshazly14@gmail.com";
const validPswd = "AAbb00--";
const mainRoute = "/api/goals/";

const goal: Goal = {
    id: 1,
    goal: "Read a book!",
    user_id: 1
};

let access: string,
    badAccess: string,
    browser: string,
    csrfCookie: string,
    csrfToken: string,
    verifyToken: string,
    user: User;
describe("Testing Routes: Goals", (): void => {
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
                goal.user_id = user.id as string | number;
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

    it("test 'get goals' after verification", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.goals).toEqual([]);
    });

    // add todo
    it("test 'add goal' ", async (): Promise<void> => {
        const response = await request
            .post(mainRoute)
            .set("Authorization", access)
            .send({
                goal: goal.goal
            })
            .expect((res) => {
                goal.id = res.body.goal.id;
                goal.date = res.body.goal.date;
            });
        expect(response.status).toBe(200);
        expect(response.body.goal).toEqual(goal);
    });

    it("test 'get' should return the goal in array", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.goals).toEqual([goal]);
    });

    it("test 'delete goal' that don't exist", async (): Promise<void> => {
        const wrongID = (goal.id as number) + 1
        const response = await request
            .delete(`${mainRoute}/${wrongID}`)
            .set("Authorization", access);
        expect(response.status).toBe(404);
    });

    it("test 'delete goal' that exists", async (): Promise<void> => {
        const response = await request
            .delete(`${mainRoute}/${goal.id}`)
            .set("Authorization", access);
        expect(response.status).toBe(200);
    });

    it("test 'get goal' should return empty array", async (): Promise<void> => {
        const response = await request
            .get(mainRoute)
            .set("Authorization", access);
        expect(response.status).toBe(200);
        expect(response.body.goals).toEqual([]);
    });
});
