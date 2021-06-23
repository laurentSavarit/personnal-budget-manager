const {Router} = require("express");
const spentController = require("./controllers/spentController");
const incomeController = require("./controllers/incomeController");
const savingController = require("./controllers/savingController");
const memberController = require("./controllers/memberController");
const categoryController = require("./controllers/categoryController");

const router = Router();

router.get("/spents",spentController.getAll);
router.get("/spent/:id",spentController.getOneById);

router.get("/incomes",incomeController.getAll);
router.get("/income/:id",incomeController.getOneById);

router.get("/savings",savingController.getAll);
router.get("/saving/:id",savingController.getOneById);

router.get("/members",memberController.getAll);
router.get("/member/:id",memberController.getOneById);

router.get("/categories",categoryController.getAll);
router.get("/category/:id",categoryController.getOneById);
router.patch("/categories",categoryController.update);
router.post("/categories",categoryController.insert);
router.delete("/categories",categoryController.delete);

module.exports = router;