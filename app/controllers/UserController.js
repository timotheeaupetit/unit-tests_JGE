const _ = require('underscore');

class UserController {
    constructor(userService) {
        this._userService = userService;
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