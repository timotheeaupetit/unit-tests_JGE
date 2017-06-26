const expect = require('expect');
const UserController = require('../../app/controllers/UserController');

describe("UserController", () => {
    describe("#constructor", () => {
        it("Verification de la presence de la propriete 'registerService'", () => {
            const userCtrl = new UserController(true);

            expect(userCtrl._registerService).toBe(true);
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
        it("Test de retour : user/user/{id}", () => {
            const userCtrl = new UserController();

            const req = { };

            const res = {
                render: view => {
                    expect(view).toBe('user/user/2');
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
                    console.log('coucou');
                    expect(view).toBe('./admin/users/new');
                    expect(data.message).toBe('Tous les champs doivent être complétés.')
                }
            };
            userCtrl.saveUser(req, res);
        });
    });
});
