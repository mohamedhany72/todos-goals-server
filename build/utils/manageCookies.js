"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookies = exports.browserCookie = exports.refreshCookie = void 0;
var refreshCookie = function (res, refresh) {
    var date = new Date();
    date.setHours(date.getHours() + 24 * 7);
    res.cookie("refresh", refresh, {
        // secure: true,
        httpOnly: true,
        expires: date
        // sameSite: 'strict',
    });
    res.cookie("x-sign", true, {
        httpOnly: false,
        expires: date
    });
    res.cookie("isLoggedIn", true);
};
exports.refreshCookie = refreshCookie;
var browserCookie = function (res, browser) {
    var date = new Date();
    date.setHours(date.getHours() + 365 * 7);
    res.cookie("browser", browser, {
        // secure: true,
        httpOnly: true,
        expires: date
        // sameSite: 'strict',
    });
};
exports.browserCookie = browserCookie;
var clearCookies = function (res) {
    res.clearCookie("browser");
    res.clearCookie("refresh");
    res.clearCookie("x-sign");
    res.clearCookie("isLoggedIn");
};
exports.clearCookies = clearCookies;
