const _ = require('underscore');

class UserController {
    constructor(registerService) {
        this._registerService = registerService;
    }

    modifyUser(req, res) {
        if (!this._fName
            ||!this.lName) {
            "A user must have a firstname and a lastname"
        }
    }
}

module.exports = UserController;