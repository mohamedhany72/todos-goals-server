import express from "express";
import { GoalModel, Goal } from "../../models/goal";

const model = new GoalModel();

const goals = express.Router();

const getGoals = async (
    _req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;

    const { success, load } = await model.select(user.id as string | number);

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).json({ goals: load });
    return;
};

const addGoal = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;
    const goal = req.body.goal;

    const { success, load } = await model.add({
        goal,
        user_id: user.id
    });

    if (!success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).json({ goal: load });
    return;
};

const deleteGoal = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;
    const id = req.params.id;

    const { success, load } = await model.show(id as string | number);

    if (!success) {
        res.status(404).send("Goal not found!");
        return;
    }

    if ((load as Goal).user_id != user.id) {
        res.status(401).send("user is not authorized");
        return;
    }

    const result = await model.delete(id as string | number);

    if (!result.success) {
        res.status(500).send("Server side Error");
        return;
    }

    res.status(200).send("Goal deleted!");
    return;
};

// select all goals
goals.get("/", getGoals);

// add goal
goals.post("/", addGoal);

// delete goal
goals.delete("/:id", deleteGoal);

export default goals;
