import { Token, TokenModel } from "../../models/token";
import { UserModel } from "../../models/user";
import { createRefreshToken } from "../../utils/createTokens";
import { resetId, userObj } from "../../utils/test_utils";

const userModel = new UserModel();
const model = new TokenModel();

let refresh = createRefreshToken(userObj);
let browser = Math.floor(Math.random() * 1000000) + 1;

const token: Token = {
    id: 1,
    refresh,
    browser,
    user_id: userObj.id as number
};

describe("Testing Tokens Model", (): void => {
    beforeAll(async (): Promise<void> => {
        resetId();
        // add user here
        await userModel.add(userObj);
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    });
    afterAll(async (): Promise<void> => {
        // remove user
        await userModel.delete(1);
        resetId();
    });

    it("'index' method should exist", (): void => {
        expect(model.index).toBeDefined();
    });

    it("'index' method should return false with code '3'", async (): Promise<void> => {
        const result = await model.index(token.user_id);
        expect(result.success).toBe(false);
        expect(result.code).toEqual(3);
    });

    it("'show' method should exist", (): void => {
        expect(model.show).toBeDefined();
    });

    it("'show' method should return false with code '3'", async (): Promise<void> => {
        const result = await model.show(token.id);
        expect(result.success).toBe(false);
        expect(result.code).toEqual(3);
    });

    it("'create' method should exist", (): void => {
        expect(model.create).toBeDefined();
    });

    it("'create' method should success", async (): Promise<void> => {
        const result = await model.create(
            token.refresh,
            token.browser,
            token.user_id
        );
        expect(result.success).toBe(true);
        expect(result.load).toEqual(token);
    });

    it("'index' method should return array with the record", async (): Promise<void> => {
        const result = await model.index(token.user_id);
        expect(result.success).toBe(true);
        expect(result.load).toEqual([token]);
    });

    it("'show' method should return the record", async (): Promise<void> => {
        const result = await model.show(token.id);
        expect(result.success).toBe(true);
        expect(result.load).toEqual(token);
    });

    it("'edit' method should exist", (): void => {
        expect(model.edit).toBeDefined();
    });

    it("'edit' method should return success", async (): Promise<void> => {
        refresh = createRefreshToken(userObj);
        const result = await model.edit(refresh, token.id);
        expect(result.success).toBe(true);
    });

    it("'delete' method should exist", (): void => {
        expect(model.delete).toBeDefined();
    });

    it("'delete' method should return success", async (): Promise<void> => {
        const result = await model.delete(token.id);
        expect(result.success).toBe(true);
    });

    it("'delete' method should return false with code '3'", async (): Promise<void> => {
        const result = await model.delete(token.id);
        expect(result.success).toBe(false);
        expect(result.code).toEqual(3);
    });

    it("create two new records", async (): Promise<void> => {
        browser = Math.floor(Math.random() * 10000) + 1;
        const result = await model.create(
            token.refresh,
            browser,
            token.user_id
        );
        expect(result.success).toBe(true);
    });

    it("create another record", async (): Promise<void> => {
        browser = Math.floor(Math.random() * 100000) + 1;
        const result = await model.create(
            token.refresh,
            browser,
            token.user_id
        );
        expect(result.success).toBe(true);
    });

    it("'deleteAll' method should exist", (): void => {
        expect(model.deleteAll).toBeDefined();
    });

    it("'deleteAll' method should return success", async () => {
        const result = await model.deleteAll(token.user_id);
        expect(result.success).toBe(true);
    });

    it("'index' method should return empty array", async () => {
        const result = await model.index(token.user_id);
        expect(result.success).toBe(false);
        expect(result.code).toEqual(3);
    });
});
