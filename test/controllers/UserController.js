const expect = require('expect');
const UserController = require('../../app/controllers/UserController');

describe("UserController", () => {

		describe("#constructor", () => {
        it("Verfication de la présence de la propriété userService", () => {
            const userController = new UserController(true);

            expect(userController._userService).toBe(true);
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

            const userController = new UserController(userService);

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
            userController.postDelete(req, res);
        });

        it("Test la défaillance du système", () => {
            const userService = {
                delete: () => {
                    return new Promise((resolve, reject) => {
                        reject('error');
                    });
                }
            };

            const userController = new UserController(userService);

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

            userController.postDelete(req, res);
        });
    });

});