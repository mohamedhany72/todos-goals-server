import express from "express";

const refreshCookie = (res: express.Response, refresh: string): void => {
    const date = new Date();
    date.setHours(date.getHours() + 24 * 7);

    res.cookie("refresh", refresh, {
        expires: date,
        path: "/",
        secure: true,
        sameSite: "none"
        // httpOnly: true,
    });

    // res.cookie("x-sign", true, {
    //     httpOnly: false,
    //     expires: date
    // });

    // res.cookie("isLoggedIn", true);
};

const browserCookie = (res: express.Response, browser: string): void => {
    const date = new Date();
    date.setHours(date.getHours() + 365 * 7);

    res.cookie("browser", browser, {
        expires: date,
        path: "/",
        secure: true,
        sameSite: "none"
        // httpOnly: true,
    });
};

const clearCookies = (res: express.Response): void => {
    res.clearCookie("browser");
    res.clearCookie("refresh");
    // res.clearCookie("x-sign");
    // res.clearCookie("isLoggedIn");
};

export { refreshCookie, browserCookie, clearCookies };
