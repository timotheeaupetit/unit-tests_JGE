const expect = require('expect');
const UserController = require('../../app/controllers/UserController');

describe("UserController", () => {
    describe("#constructor", () => {
        it("Verification de la presence de la propriete 'registerService'", () => {
            const userCtrl = new UserController(true);

            expect(userCtrl._registerService).toBe(true);
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

            userCtrl.register(req, res);
        });
    });

    describe("#saveUser", () => {
        // un champ obligatoire est vide
        // tous les champs sont remplis correctement
        // il n'y a aucun changement
    });
});