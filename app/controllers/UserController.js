const _ = require('underscore');

class UserController {
    constructor(registerService) {
        this._registerService = registerService;
    }

    listUsers(req, res) {
        res.render("./admin/users");
    }

    modifyUser(req, res) {
        res.render("user/user/2");
    }

    addUser(req, res) {
        res.render('./admin/users/new');
    }

    saveUser(req, res) {
        if(underscore.isEmpty(req.body)
            || underscore.isEmpty(req.body.email)
            || underscore.isEmpty(req.body.licence)
            || underscore.isEmpty(req.body.password)
            || underscore.isEmpty(req.body.confirm)) {
            res.render('./admin/users/new', {
                message: 'Tous les champs doivent être complétés.'
            });
            return;
        }
    }
}
module.exports = UserController;