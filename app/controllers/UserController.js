const _ = require('underscore');

class UserController {
    constructor(userService) {
        this._userService = userService;
    }

    listUsers(req, res) {
        this._userService.list().then(
            result => {
                console.log(result);

                res.render('admin/users', {
                    list: result
                });
            }
        ).catch(e => {
            res.render('admin/users', {
                message: 'System error'
            });
        });
    }

    modifyUser(req, res) {
        res.render("admin/users/{id}/modify");
    }

    addUser(req, res) {
        res.render('admin/users/new');
    }

    saveUser(req, res) {
        if (_.isEmpty(req.body)
            || _.isEmpty(req.body.firstname)
            || _.isEmpty(req.body.lastname)
            || _.isEmpty(req.body.email)
            || _.isEmpty(req.body.login)) {
            res.render('admin/users/new', {
                message: 'Tous les champs doivent etre completes.'
            });
            return;
        }

        this._userService.add(req.body).then(
            result => {
                let message = "Utilisateur enregistre avec succes";

                if (result === 'login already exists') {
                    message = "Ce login existe deja";
                }

                res.render("admin/users/new", {
                    message: message
                });
            }
        ).catch(e => {
            res.render('admin/users/new', {
                message: 'Erreur systeme'
            })
        });
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