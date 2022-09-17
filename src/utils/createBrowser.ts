import { TokenModel, Token } from "../models/token";
import { createBrowserToken, createRefreshToken } from "./createTokens";
import { User } from "../models/user";

const tokens = new TokenModel();

type ReturnJson = {
    success: boolean;
    code: number;
    msg?: string;
    browser?: string;
    refresh?: string;
};

const createBrowser = async (
    refreshToken: string,
    user: User
): Promise<ReturnJson> => {
    const user_id = (user as User).id as string | number;
    const { success, load } = await tokens.index(user_id);

    let rand = Math.floor(Math.random() * 1000000) + 1;

    if (success) {
        const browsers = (load as [Token]).map((item) => Number(item.browser));
        while (browsers.includes(rand)) {
            rand = Math.floor(Math.random() * 1000000) + 1;
        }
    }

    // const refresh = createRefreshToken(user);

    const result = await tokens.create(refreshToken, rand, user_id);

    if (!result.success) {
        return {
            success: false,
            code: 2,
            msg: result.msg,
            browser: ""
        };
    }

    const browser = createBrowserToken(user, (result.load as Token).id, rand);

    return {
        success: true,
        code: 1,
        browser
    };
};

const selectBrowser = async (
    user_id: string | number,
    id: string | number,
    browser: string | number
): Promise<ReturnJson> => {
    const { success, load } = await tokens.show(id);

    if (!success) {
        return {
            success: false,
            code: 3,
            msg: "Record not found"
        };
    }

    if (user_id != (load as Token).user_id) {
        return {
            success: false,
            code: 4,
            msg: "User id not equal that from db"
        };
    }

    if (browser != (load as Token).browser) {
        return {
            success: false,
            code: 4,
            msg: "Browser code not equal that from db"
        };
    }

    return {
        success: true,
        code: 1,
        refresh: (load as Token).refresh,
        msg: "Record found!"
    };
};

const updateRefresh = async (
    browser: string | number,
    user: User,
    refresh: string,
    id: string | number
): Promise<ReturnJson> => {
    const user_id = (user as User).id as string | number;

    const result = await selectBrowser(user_id, id, browser);

    if (!result.success) {
        return {
            success: false,
            code: result.code,
            msg: result.msg
        };
    }

    if (refresh != result.refresh) {
        return {
            success: false,
            code: 5,
            msg: "Refresh code not equal that from db"
        };
    }

    const newRefresh = createRefreshToken(user);

    const { success } = await tokens.edit(newRefresh, id);

    if (!success) {
        return {
            success: false,
            code: 2,
            msg: "Server side error!"
        };
    }

    return {
        success: true,
        code: 1,
        refresh: newRefresh
    };
};

export { createBrowser, selectBrowser, updateRefresh };
