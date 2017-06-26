const _ = require('underscore');

class UserController {
    constructor(registerService) {
        this._registerService = registerService;
    }

    modifyUser(req, res) {
        res.render("user/user/2");
    }

    saveUser(req, res) {
        if (!this._fName
            ||!this.lName) {
            "A user must have a firstname and a lastname"
        }
    }
}

module.exports = UserController;