const expect = require('expect');
const UserController = require('../../app/controllers/UserController');

describe("UserController", () => {
    describe("#constructor", () => {
        it("Verification de la presence de la propriete 'userService'", () => {
            const userCtrl = new UserController(true);

            expect(userCtrl._userService).toBe(true);
        });
    });

    describe("#listUsers", () => {
        it("Test route to Users list ./admin/users", () => {
            const userCtrl = new UserController();
            const req = {};
            const res = {
                render: view => {
                    expect(view).toBe("./admin/users");
                }
            };
            userCtrl.listUsers(req, res);
        });
    });

    describe("#addUser", () => {
        it("Test de routing vers ./admin/users/new", () => {
            const userCtrl = new UserController();
            const req = {};
            const res = {
                render: view => {
                    expect(view).toBe('./admin/users/new');
                }
            };
            userCtrl.addUser(req, res);
        });
    });

    describe("#modifyUser", () => {
        it("Test de retour : ./admin/users/{id}/modify", () => {
            const userCtrl = new UserController();

            const req = { };

            const res = {
                render: view => {
                    expect(view).toBe('./admin/users/{id}/modify');
                }
            };

            userCtrl.modifyUser(req, res);
        });
    });

    describe("#saveUser", () => {
        it("Renvoie un message d'erreur si tous les champs ne sont pas complétés", () => {
            const userCtrl = new UserController();

            const req = {
                body: {
                    // email: 'john.doe@domain.tld',
                    // licence: "12345P",
                    // password: '1234567890',
                    // confirm: '1234567890'
                }
            };
            const res = {
                render: (view, data) => {
                    expect(view).toBe('./admin/users/new');
                    expect(data.message).toBe('Tous les champs doivent être complétés.')
                }
            };
            userCtrl.saveUser(req, res);
        });

        it("Test si le mdp et la confirmation sont ok", () => {
            const userCtrl = new UserController();

            const req = {
                body: {
                    email: 'jeanclaude.vandamme@domain.tld',
                    licence: '12345P',
                    password: '123456789',
                    confirm: 'aaabbbcccddd'
                }
            };
            const res = {
                render: (view, data) => {
                    expect(view).toBe('./admin/users/new');
                    expect(data.message).toBe('La confirmation est différente du mot de passe.');
                }
            };
            userCtrl.saveUser(req, res);
        });
    });

    describe("#delete", () => {
        it("Test de retour : Users", () => {
		        const user = new UserController();
		        const req = { };
		        const res = {
		            render: view => {
		                expect(view).toBe('Users');
		            }
		        };
		        user.delete(req, res);
       	});
    });

    describe("#postDelete", () => {
        it("Test utilisateur existant", () => {
        		const userService = {
                delete: () => {
                    return new Promise((resolve, reject) => {
                        resolve('unknown_user');
                    });
                }
            };

            const userCtrl = new UserController(userService);

		        const req = {
                body: {
                    id: 0,
                }
            };

		        const res = {
                render: (view, data) => {
                    expect(view).toBe('Users');
                    expect(data.message).toBe("Cet utilisateur n\'existe pas.");
                }
            };
            userCtrl.postDelete(req, res);
        });

        it("Test la défaillance du système", () => {
            const userService = {
                delete: () => {
                    return new Promise((resolve, reject) => {
                        reject('error');
                    });
                }
            };

            const userCtrl = new UserController(userService);

            const req = {
                body: {
                    id: 0,
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('Users');
                    expect(data.message).toBe("Erreur système");
                }
            };

            userCtrl.postDelete(req, res);
        });
    });
});