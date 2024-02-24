// authentication.router.js

import { Authentication } from "../../middleware/Authentication.middleware";
import UserController from "../../mvc/controllers/userAccount.controller";

const RouterAuth = (router) => {
    // router.get('/', UserController.);
    router.post('/', Authentication, (req, res, next) => {
        console.log("userID: ", req.body.user_id);
        res.status(200).json({ messenger: "oke" });
    });
    router.post('/signup', UserController.createUser);

    return router; // Add this line to return the router
}

module.exports = RouterAuth;
