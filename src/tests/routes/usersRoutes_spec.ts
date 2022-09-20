import supertest from "supertest";
import app from "../../server";
import { userObj } from "../../utils/test_utils";
import { createVerifyToken, createPswdToken } from "../../utils/createTokens";

const request = supertest(app);

let badToken: string,
    access: string,
    badAccess: string,
    refresh: string,
    pswdToken: string,
    badPswdToken: string,
    browser: string,
    verifyToken: string,
    csrfToken: string,
    badcsrf: string,
    csrfCookie: string;

const validEmail = "medo.elshazly14@gmail.com";
let validPswd = "AAbb00--";
let oldValidPswd: string;
const mainRoute = "/api/users/";

describe("Testing Routes: Users", (): void => {
    // test register
    it("test 'Register' with bad data", async (): Promise<void> => {
        let name = "a";
        let email = "aa.com";
        const gender = "5";
        let pswd = "badpassword";
        let cpswd = "anotherBadpassword";

        const response1 = await request.post(mainRoute + "register").send({
            name,
            email,
            gender,
            pswd,
            cpswd
        });
        expect(response1.status).toBe(406);
        expect(response1.text).toBe("name must have at least 3 characters!");

        name = "mohamed";
        const response2 = await request.post(mainRoute + "register").send({
            name,
            email,
            gender,
            pswd,
            cpswd
        });
        expect(response2.status).toBe(406);
        expect(response2.text).toBe("please enter a valid email!");

        email = validEmail;
        const response3 = await request.post(mainRoute + "register").send({
            name,
            email,
            gender,
            pswd,
            cpswd
        });
        expect(response3.status).toBe(406);
        expect(response3.text).toBe("passwords not match!");

        pswd = "badequalpass";
        cpswd = "badequalpass";
        const response4 = await request.post(mainRoute + "register").send({
            name,
            email,
            gender,
            pswd,
            cpswd
        });
        expect(response4.status).toBe(406);
        expect(response4.text).toBe(
            "password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!"
        );

        pswd = validPswd;
        cpswd = validPswd;
        const response5 = await request.post(mainRoute + "register").send({
            name,
            email,
            gender,
            pswd,
            cpswd
        });
        expect(response5.status).toBe(406);
        expect(response5.text).toBe("you must select gender!");
    });

    it("test 'Register' with good data", async (): Promise<void> => {
        const name = userObj.name;
        const email = validEmail;
        const gender = userObj.gender;
        const pswd = validPswd;
        const cpswd = validPswd;

        const response = await request
            .post(mainRoute + "register")
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
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                browser = res.headers["set-cookie"][1]
                    .split(";")[0]
                    .split("=")[1];
                badToken = res.body.broswer + "invalid";
                verifyToken = createVerifyToken(res.body.user);
                pswdToken = createPswdToken(res.body.user.id);
                badPswdToken = pswdToken + "k";

                // console.log("------------------------------")
                // console.log(`Refresh: ${refresh}`)
                // console.log("------------------------------")
                // console.log(`Browser: ${browser}`)
                // console.log("------------------------------")
            });
        expect(response.status).toBe(200);
    });

    // test logout
    it("test 'Logout' with unauthorizied token", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", badAccess)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");
    });

    it("test 'Logout' with unvalid tokens", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", access)
            .set("Cookie", [`browser=${badToken}`]);
        expect(response.status).toBe(403);
    });

    it("test 'Logout' with good tokens", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(200);
    });

    // test login
    it("test 'Login' with bad data", async (): Promise<void> => {
        let email = "medo@medo.com";
        const pswd = "AAbb00--f";
        const response = await request.post(mainRoute + "login").send({
            email
        });
        expect(response.status).toBe(406);
        expect(response.text).toBe("please enter email and password!");

        const response2 = await request.post(mainRoute + "login").send({
            email,
            pswd
        });
        expect(response2.status).toBe(404);
        expect(response2.text).toBe("User not found!");

        email = validEmail;
        const response3 = await request.post(mainRoute + "login").send({
            email,
            pswd
        });
        expect(response3.status).toBe(403);
        expect(response3.text).toBe("Wrong password!");
    });

    it("test 'Login' with good data", async (): Promise<void> => {
        const response = await request
            .post(mainRoute + "login")
            .send({
                email: validEmail,
                pswd: validPswd
            })
            .expect((res) => {
                access = "Bearer " + res.body.access;
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                browser = res.headers["set-cookie"][1]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    // send verify
    it("test 'sendVerify' with bad token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "sendverify")
            .set("Authorization", badAccess);

        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");
    });

    it("test 'sendVerify' with good token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "sendverify")
            .set("Authorization", access);
        expect(response.status).toBe(200);
    });

    // verify user
    it("test 'verify' with bad token", async (): Promise<void> => {
        const response = await request.get(mainRoute + `verify/${badToken}`);
        expect(response.status).toBe(403);
        expect(response.text).toBe("token expired or not valid!");
    });

    it("test 'verify' with good token", async (): Promise<void> => {
        const response = await request.get(mainRoute + `verify/${verifyToken}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe("User verified!");
    });

    // csrf get
    it("test 'csrf get' with bad token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "csrf")
            .set("Authorization", badAccess);
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");
    });

    it("test 'update get' with good token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "csrf")
            .set("Authorization", access)
            .expect((res) => {
                csrfToken = res.body.csrfToken;
                csrfCookie = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                badcsrf = csrfToken + "k";
            });
        expect(response.status).toBe(200);
    });

    // update put
    it("test 'update put' with bad access token", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "update")
            .set("Authorization", badAccess)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                name: "new name",
                gender: 1
            });
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");
    });
    it("test 'update put' with bad csrf token", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "update")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                name: "new name",
                gender: 1,
                _csrf: badcsrf
            });
        expect(response.status).toBe(403);
    });

    it("test 'update put' with bad data", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "update")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                name: "new name",
                gender: 8
            });
        expect(response.status).toBe(406);
    });

    it("test 'update put' with good data", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "update")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                name: "medo capo",
                gender: 1
            });
        expect(response.status).toBe(200);
    });

    // pswd put
    it("test 'change pswd' with bad access", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", badAccess)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: badcsrf,
                opswd: "new name",
                pswd: "badpassword",
                cpswd: "anotherbadpassword"
            });
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");
    });

    it("test 'change pswd' with bad csrf", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: badcsrf,
                opswd: "new name",
                pswd: "badpassword",
                cpswd: "anotherbadpassword"
            });
        expect(response.status).toBe(403);
    });

    it("test 'change pswd' with bad data", async (): Promise<void> => {
        const response = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                opswd: "new name",
                pswd: "badpassword",
                cpswd: "anotherbadpassword"
            });
        expect(response.status).toBe(406);
        expect(response.text).toBe("Wrong old password!");

        const response2 = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                opswd: validPswd,
                pswd: "badpassword",
                cpswd: "anotherbadpassword"
            });
        expect(response2.status).toBe(406);
        expect(response2.text).toBe("passwords not match!");

        const response3 = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                opswd: validPswd,
                pswd: "badpassword",
                cpswd: "badpassword"
            });
        expect(response3.status).toBe(406);
        expect(response3.text).toBe(
            "password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!"
        );
    });

    it("test 'change pswd' with good data", async (): Promise<void> => {
        oldValidPswd = validPswd;
        validPswd = "BBaa00--";
        const response = await request
            .put(mainRoute + "changepassword")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                opswd: oldValidPswd,
                pswd: validPswd,
                cpswd: validPswd
            });
        expect(response.status).toBe(200);
    });

    it("'Logout' after password changed", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(200);
        access = refresh = browser = csrfToken = csrfCookie = "";
    });

    // test login
    it("test 'Login' with old password return 'Wrong password!'", async (): Promise<void> => {
        const response = await request.post(mainRoute + "login").send({
            email: validEmail,
            pswd: oldValidPswd
        });
        expect(response.status).toBe(403);
        expect(response.text).toBe("Wrong password!");
    });
    it("test 'Login' with new password", async (): Promise<void> => {
        const response = await request
            .post(mainRoute + "login")
            .send({
                email: validEmail,
                pswd: validPswd
            })
            .expect((res) => {
                access = "Bearer " + res.body.access;
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                browser = res.headers["set-cookie"][1]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    // forget password
    it("test 'forget password' with non-existing email", async (): Promise<void> => {
        const response = await request.post(mainRoute + "forgetpassword").send({
            email: "medo@medo.com"
        });
        expect(response.status).toBe(404);
        expect(response.text).toBe(
            "Email doesn't exist, please try to sign up!"
        );
    });

    it("test 'forget password' with existing email", async (): Promise<void> => {
        const response = await request.post(mainRoute + "forgetpassword").send({
            email: validEmail
        });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Email sent!");
    });

    // recover password get
    it("test 'recover password get' with bad token", async (): Promise<void> => {
        const response = await request.get(mainRoute + `recoverpassword/`);

        expect(response.status).toBe(404);
        // expect(response.text).toBe("Code in email is required!");

        const response2 = await request.get(
            mainRoute + `recoverpassword/${badPswdToken}`
        );

        expect(response2.status).toBe(403);
        expect(response2.text).toBe("Token expired or not valid");
    });

    it("test 'recover password get' with good token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + `recoverpassword/${pswdToken}`)
            .expect((res) => {
                csrfToken = res.body.csrfToken;
                csrfCookie = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                pswdToken = res.body.code;
            });

        expect(response.status).toBe(200);
    });

    // recover password put
    it("test 'recover password' with bad data", async (): Promise<void> => {
        // without csrfToken
        const response0 = await request
            .put(mainRoute + "recoverpassword")
            .send({
                pswd: "badpassword"
            });
        expect(response0.status).toBe(403);

        // without pswd code
        const response = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: "badpassword"
            });
        expect(response.status).toBe(406);
        expect(response.text).toBe("Code in email is required!");

        // without cpswd
        const response2 = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                code: badPswdToken,
                pswd: "badpassword"
            });
        expect(response2.status).toBe(406);
        expect(response2.text).toBe("passwords not match!");

        // pswd !== cpswd
        const response3 = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                code: badPswdToken,
                pswd: "badPassword",
                cpswd: "anotherBadPassord"
            });
        expect(response3.status).toBe(406);
        expect(response3.text).toBe("passwords not match!");

        // bad password
        const response4 = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                code: badPswdToken,
                pswd: "badPassword",
                cpswd: "badPassword"
            });
        expect(response4.status).toBe(406);
        expect(response4.text).toBe(
            "password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!"
        );

        // bad email code
        const response5 = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                code: badPswdToken,
                pswd: "AAbb00--",
                cpswd: "AAbb00--"
            });
        expect(response5.status).toBe(403);
        expect(response5.text).toBe("Token expired or not valid");
    });

    it("test 'recover password' with good data", async (): Promise<void> => {
        oldValidPswd = validPswd;
        validPswd = "AAbb00--";
        const response5 = await request
            .put(mainRoute + "recoverpassword")
            .set("Cookie", [`_csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                code: pswdToken,
                pswd: validPswd,
                cpswd: validPswd
            });
        expect(response5.status).toBe(200);
        expect(response5.text).toBe("Password changed!");
    });

    it("'Logout' after password changed", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(200);
        access = refresh = browser = csrfToken = csrfCookie = "";
    });

    // test login
    it("test 'Login' with old password return 'Wrong password!'", async (): Promise<void> => {
        const response = await request.post(mainRoute + "login").send({
            email: validEmail,
            pswd: oldValidPswd
        });
        expect(response.status).toBe(403);
        expect(response.text).toBe("Wrong password!");
    });
    it("test 'Login' with new password", async (): Promise<void> => {
        const response = await request
            .post(mainRoute + "login")
            .send({
                email: validEmail,
                pswd: validPswd
            })
            .expect((res) => {
                access = "Bearer " + res.body.access;
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                browser = res.headers["set-cookie"][1]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    // test refresh
    it("test 'refresh' with bad token", async (): Promise<void> => {
        // not valid token
        const response = await request
            .get(mainRoute + "refresh")
            .set("Cookie", [`browser=${browser}; refresh=${badToken}`]);
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");

        // valid non refresh token
        const response2 = await request
            .get(mainRoute + "refresh")
            .set("Cookie", [`browser=${browser}; refresh=${browser}`]);
        expect(response2.status).toBe(401);
        expect(response2.text).toBe("you are not authorized");
    });

    it("test 'refresh' with good token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "refresh")
            .set("Cookie", [`browser=${browser};refresh=${refresh}`])
            .expect((res) => {
                access = "Bearer " + res.body.access;
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    // get access
    it("test 'get access' with bad token", async (): Promise<void> => {
        // not valid token
        const response = await request
            .get(mainRoute + "getaccess")
            .set("Cookie", [`refresh=${badToken}`]);
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");

        // valid non refresh token
        const response2 = await request
            .get(mainRoute + "getaccess")
            .set("Cookie", [`refresh=${browser}`]);
        expect(response2.status).toBe(401);
        expect(response2.text).toBe("you are not authorized");
    });

    it("test 'get access' with good token", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "getaccess")
            .set("Cookie", [`refresh=${refresh}`])
            .expect((res) => {
                access = "Bearer " + res.body.access;
            });
        expect(response.status).toBe(200);
    });

    // test refresh after logout
    it("logout again", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logout")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(200);
    });

    it("test 'refresh' with good token after logout - should fail", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "refresh")
            .set("Cookie", [`browser=${browser};refresh=${refresh}`]);
        expect(response.status).toBe(401);
        expect(response.text).toBe("Record not found");
        access = refresh = browser = csrfToken = csrfCookie = "";
    });

    // test logout all
    it("test 'Login' with new password", async (): Promise<void> => {
        const response = await request
            .post(mainRoute + "login")
            .send({
                email: validEmail,
                pswd: validPswd
            })
            .expect((res) => {
                access = "Bearer " + res.body.access;
                refresh = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
                browser = res.headers["set-cookie"][1]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    it("test 'logout all' after logging in again", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "logoutall")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}`]);
        expect(response.status).toBe(200);
        // access = refresh = browser = csrfToken = csrfCookie = "";
    });

    // test delete
    it("get csrf token to delete user", async (): Promise<void> => {
        const response = await request
            .get(mainRoute + "csrf")
            .set("Authorization", access)
            .expect((res) => {
                csrfToken = res.body.csrfToken;
                csrfCookie = res.headers["set-cookie"][0]
                    .split(";")[0]
                    .split("=")[1];
            });
        expect(response.status).toBe(200);
    });

    it("test 'delete user' with bad data", async (): Promise<void> => {
        // using bad access
        const response = await request
            .delete(mainRoute + "delete")
            .set("Authorization", badAccess)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: "badpswd",
                confirmMsg: "don't delete my account!"
            });
        expect(response.status).toBe(403);
        expect(response.text).toBe("Token expired or not valid");

        // using bad csrf
        const response2 = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                pswd: "badpswd",
                confirmMsg: "don't delete my account!",
                _csrf: badcsrf
            });
        expect(response2.status).toBe(403);

        // using bad confirmation
        const response3 = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: "badpswd",
                confirmMsg: "don't delete my account!"
            });
        expect(response3.status).toBe(406);
        expect(response3.text).toBe(
            "please confirm that you want to delete your account!"
        );

        // using bad pswd
        const response4 = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                confirmMsg: "I want to delete my account"
            });
        expect(response4.status).toBe(406);
        expect(response4.text).toBe(
            "please enter password to delete your account!"
        );

        const response5 = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: "badpswd",
                confirmMsg: "I want to delete my account"
            });
        expect(response5.status).toBe(403);
        expect(response5.text).toBe("Wrong password!");
    });

    it("test 'delete user' with good data", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: validPswd,
                confirmMsg: "I want to delete my account"
            });
        expect(response.status).toBe(200);
        expect(response.text).toBe("Account deleted!");
    });

    it("test 'delete user' with good data again - should return 500", async (): Promise<void> => {
        const response = await request
            .delete(mainRoute + "delete")
            .set("Authorization", access)
            .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
            .send({
                _csrf: csrfToken,
                pswd: validPswd,
                confirmMsg: "I want to delete my account"
            });
        expect(response.status).toBe(404);
        access = refresh = browser = csrfToken = csrfCookie = "";
    });

    it("test 'login' after user is deleted", async (): Promise<void> => {
        const response = await request.post(mainRoute + "login").send({
            email: validEmail,
            pswd: validPswd
        });
        expect(response.status).toBe(404);
        expect(response.text).toBe("User not found!");
    });
});
