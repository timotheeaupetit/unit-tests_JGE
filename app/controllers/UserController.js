const _ = require('underscore');

class UserController {
    constructor(userService) {
        this._userService = userService;
    }

    listUsers(req, res) {
        res.render("./admin/users");
    }

    modifyUser(req, res) {
        res.render("./admin/users/{id}/modify");
    }

    addUser(req, res) {
        res.render('./admin/users/new');
    }

    saveUser(req, res) {
        if (underscore.isEmpty(req.body)
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

    delete(req, res) {
        res.render('Users');
    }

    postDelete(req, res) {
        this._userService.delete(req.body.id).then(
            result => {
                let message = 'User deleted.';

                if(result === 'unknown_user') {
                  message = 'Cet utilisateur n\'existe pas.';
									console.log(message);
                }
								console.log(message);
								
                res.render('Users', {
                    message: message
                });
            }
        ).catch(e => {
            res.render('Users', {
                message: 'Erreur système'
            });
        });

    }
}
module.exports = UserController;