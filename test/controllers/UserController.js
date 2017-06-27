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
        it("Test: user list is empty", () => {
            const userService = {
                list: () => {
                    return new Promise(resolve => {
                        resolve([]); // empty list
                    });
                }
            };
            const userCtrl = new UserController(userService);

            const req = {};
            const res = {
                render: (view, data) => {
                    expect(view).toBe("admin/users");
                    expect(data.list.length).toBe(0);
                }
            };

            userCtrl.listUsers(req, res);
        });
    });

    describe("#addUser", () => {
        it("Test de routing vers admin/users/new", () => {
            const userCtrl = new UserController();
            const req = {};
            const res = {
                render: view => {
                    expect(view).toBe('admin/users/new');
                }
            };
            userCtrl.addUser(req, res);
        });
    });

    describe("#modifyUser", () => {
        it("Test de retour : admin/users/{id}/modify", () => {
            const userCtrl = new UserController();

            const req = { };

            const res = {
                render: view => {
                    expect(view).toBe('admin/users/{id}/modify');
                }
            };

            userCtrl.modifyUser(req, res);
        });
    });

    describe("#saveUser", () => {
        it("Test : tous les champs sont vides", () => {
            const userCtrl = new UserController();

            const req = {
                body: {}
            };
            const res = {
                render: (view, data) => {
                    expect(view).toBe('admin/users/new');
                    expect(data.message).toBe('Tous les champs doivent etre completes.')
                }
            };
            userCtrl.saveUser(req, res);
        });

        it("Test : defaillance du systeme", () => {
            const userService = {
                add: () => {
                    return new Promise((resolve, reject) => {
                        reject('persist_failed');
                    });
                }
            };

            const userCtrl = new UserController(userService);

            const req = {
                body: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@domain.tld",
                    login: "toto"
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('admin/users/new');
                    expect(data.message).toBe("Erreur systeme");
                }
            };

            userCtrl.saveUser(req, res);
        });

        it("Test : login en doublon", () => {
            const userService = {
                add: () => {
                    return new Promise((resolve, reject) => {
                        resolve('login already exists');
                    });
                }
            };

            const userCtrl = new UserController(userService);

            const req = {
                body: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@domain.tld",
                    login: "toto"
                }
            };

            const res = {
                render: (view, data) => {
                    expect(view).toBe('admin/users/new');
                    expect(data.message).toBe("Ce login existe deja");
                }
            };

            userCtrl.saveUser(req, res);
        })
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