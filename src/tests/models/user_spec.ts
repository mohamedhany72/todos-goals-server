import { User, UserModel } from "../../models/user";
import { resetId, userObj } from "../../utils/test_utils";
import destructureUser from "../../utils/destructureUser";

const model = new UserModel();

const userReturned: User = {
    id: 1,
    name: "Mohamed Hany",
    email: "medo@medo.com",
    gender: 1,
    picurl: null,
    verified: false
};
let oldHash: string;

describe("Testing Model: User", (): void => {
    beforeAll(async (): Promise<void> => {
        resetId();
    });

    afterAll(async (): Promise<void> => {
        resetId();
    });

    it("'Select' method should exist", (): void => {
        expect(model.select).toBeDefined();
    });
    it("'Select' method should return false", async (): Promise<void> => {
        const result = await model.select(userObj.email);
        expect(result.success).toBeFalse();
        expect(result.msg).toBe("user doesn't exist");
    });

    // add method should exist
    it("'Add' method should exist", (): void => {
        expect(model.add).toBeDefined();
    });

    // add method should add the user
    it("'Add' method should add the user", async (): Promise<void> => {
        const result = await model.add(userObj);
        oldHash = (result.load as unknown as User).password as string;

        const user = destructureUser(result.load as User);
        // @ts-ignore
        expect(user).toEqual(userReturned);
    });

    // select method should select the user
    it("'Select' method should return the user", async (): Promise<void> => {
        const result = await model.select(userObj.email);
        const user = destructureUser(result.load as User);
        // @ts-ignore
        expect(user).toEqual(userReturned);
    });

    // verify method should exist
    it("'Verify' method should exist", (): void => {
        expect(model.update).toBeDefined();
    });

    // verify method should verify the user
    it("'Verify' method should verify the user", async (): Promise<void> => {
        userReturned.verified = true;
        const result = await model.verify(userObj.email);
        expect(result.success).toBe(true);
    });

    // update method should exist
    it("'Update' method should exist", (): void => {
        expect(model.update).toBeDefined();
    });
    // update method should update the user
    it("'Update' method should update the user", async (): Promise<void> => {
        const result = await model.update(1, "Mido Hany", 1, "url");
        const user = destructureUser(result.load as User);
        userReturned.name = "Mido Hany";
        userReturned.picurl = "url";
        // @ts-ignore
        expect(user).toEqual(userReturned);
    });

    // change password should exist
    it("'Change Password' should exist", (): void => {
        expect(model.changePassword).toBeDefined();
    });

    // change password should update the user
    it("'Change Password' should update the user", async (): Promise<void> => {
        const result = await model.changePassword(1, "123password");
        const newHash = (result.load as unknown as User).password as string;
        expect(newHash).not.toEqual(oldHash);
    });

    // delete method should exist
    it("'Delete' method should exist", (): void => {
        expect(model.delete).toBeDefined();
    });

    // delete method should delete the user
    it("'Delete' method should delete the user", async (): Promise<void> => {
        await model.delete(1);
        const result = await model.select(userObj.email);
        expect(result.success).toBeFalse();
        expect(result.msg).toBe("user doesn't exist");
    });
});
