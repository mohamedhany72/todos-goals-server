import { Goal, GoalModel } from "../../models/goal";
import { UserModel } from "../../models/user";
import { resetId, userObj } from "../../utils/test_utils";

const userModel = new UserModel();

const model = new GoalModel();

const goalObj: Goal = {
    id: 1,
    goal: "Master SERN stack",
    user_id: 1
};

describe("Testing Model: Goal", (): void => {
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
    // select method shoulg return empty array
    it("'select' method shoulg return empty array", async (): Promise<void> => {
        const result = await model.select(1);
        expect(result.load).toEqual([]);
    });

    // add method should exist
    it("'add' method should exist", (): void => {
        expect(model.add).toBeDefined();
    });
    // add method should return the goal
    it("'add' method should return the goal", async (): Promise<void> => {
        const result = await model.add(goalObj);
        const load: Goal = result.load as unknown as Goal;
        const goal: Goal = (({ id, goal, user_id }) => ({
            id,
            goal,
            user_id
        }))(load);
        expect(goal).toEqual(goalObj);
    });

    // select method should select the goal
    it("'select' method should select the goal", async (): Promise<void> => {
        const result = await model.select(1);
        const load: Goal[] = result.load as unknown as Goal[];
        const goal: Goal = (({ id, goal, user_id }) => ({
            id,
            goal,
            user_id
        }))(load[0]);
        expect(goal).toEqual(goalObj);
    });

    // delete method should exist
    it("'delete' method should exist", (): void => {
        expect(model.delete).toBeDefined();
    });
    // delete method should delete the goal
    it("'delete' method should delete the goal", async (): Promise<void> => {
        await model.delete(1);
        const result = await model.select(1);
        expect(result.load).toEqual([]);
    });
});
