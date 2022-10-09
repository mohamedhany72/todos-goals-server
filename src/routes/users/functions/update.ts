import express from "express";
import { User, UserModel } from "../../../models/user";
import {
    createAccessToken,
    createRefreshToken
} from "../../../utils/createTokens";
import destructureUser from "../../../utils/destructureUser";
import { updateRefresh } from "../../../utils/createBrowser";
import { NAME_REGEX } from "./register";
// import { refreshCookie } from "../../../utils/manageCookies";
import fse from "fs-extra";
import path from "path";

const model = new UserModel();

const update = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const browserObj = res.locals.browser;
    const oldRefresh = req.cookies.refresh;
    const oldUser = res.locals.user as User;

    const name = req.body.name as string;
    const gender = req.body.gender;
    const removePic = req.body.remove_pic === "false" ? false : true;

    // @ts-ignore
    const file = req.files.file || false;

    let fileName = oldUser.picurl;

    const tempDir = path.join(__dirname, "..", "..", "..", "..", "temp");
    const uploadDir = path.join(__dirname, "..", "..", "..", "..", "uploads");

    // @ts-ignore
    // console.log("files: ", req.files);

    if (file && !removePic) {
        console.log("ok");
        const {
            size: fileSize,
            type: fileType,
            name: oldFileName,
            path: fileTempPath
        } = file;

        // validate the image
        const maxSize = 2 * 1024 * 1024; // 2 mb
        if (fileSize > maxSize) {
            res.status(415).send("file size is too large!");
            return;
        }

        if (fileType !== ("image/png" && "image/jpeg")) {
            res.status(415).send("file must be image (.jpg or .jpeg or .png)!");
            return;
        }

        // now lets add the file
        const fileTempNameObj = fileTempPath.split(`\\`);
        const fileTempName = fileTempNameObj[fileTempNameObj.length - 1];

        const newFileName = Date.now() + "_" + oldFileName;
        fse.copySync(
            path.join(tempDir, fileTempName),
            path.join(uploadDir, newFileName)
        );
        // , err => {
        //     if (err) {
        //         res.status(500).send("Server side error! error copying the file");
        //         return;
        //     }

        fileName = newFileName;
        // })
    }

    // validate data
    if (name == null || !NAME_REGEX.test(name)) {
        if (file) {
            fse.remove(path.join(uploadDir, fileName as string));
        }
        res.status(406).send("name must have at least 3 characters!");
        return;
    }

    if (gender == null || (Number(gender) !== 1 && Number(gender) !== 2)) {
        if (file) {
            fse.remove(path.join(uploadDir, fileName as string));
        }
        res.status(406).send("you must select gender!");
        return;
    }

    // update user in db
    const { success, load, msg } = await model.update(
        oldUser.id as string | number,
        name,
        gender,
        removePic ? null : (fileName as string | null)
    );

    if (!success) {
        if (file) {
            fse.remove(path.join(uploadDir, fileName as string));
        }
        res.status(500).send(`Server side error:: ${msg}`);
        return;
    } else if (
        (removePic && oldUser.picurl) ||
        (oldUser.picurl !== fileName && oldUser.picurl)
    ) {
        fse.remove(path.join(uploadDir, oldUser.picurl as string));
    }

    // destructure user object
    const user = destructureUser(load as User);

    // generate tokens
    const access = createAccessToken(user);

    // update tokens in db
    const result = await updateRefresh(
        browserObj.browser,
        user,
        oldRefresh,
        browserObj.id
    );
    let refresh = createRefreshToken(user);
    if (result.success) {
        refresh = result.refresh as string;
    }

    // send back the successfull response
    // refreshCookie(res, refresh);
    res.status(200).json({
        user,
        access,
        refresh
    });
    return;
};

export default update;
