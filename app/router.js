const {Router} = require("express");
const spentController = require("./controllers/spentController");
const incomeController = require("./controllers/incomeController");
const savingController = require("./controllers/savingController");
const memberController = require("./controllers/memberController");
const categoryController = require("./controllers/categoryController");

const router = Router();

router.get("/spents",spentController.getAll);
router.get("/spent/:id",spentController.getOneById);
router.patch("/spents",spentController.save);
router.post("/spents",spentController.save);
router.delete("/spent/:id",spentController.delete);

router.get("/incomes",incomeController.getAll);
router.get("/income/:id",incomeController.getOneById);
router.patch("/incomes",incomeController.save);
router.post("/incomes",incomeController.save);
router.delete("/income/:id",incomeController.delete);

router.get("/savings",savingController.getAll);
router.get("/saving/:id",savingController.getOneById);
router.patch("/savings",savingController.save);
router.post("/savings",savingController.save);
router.delete("/saving/:id",savingController.delete);

router.get("/members",memberController.getAll);
router.get("/member/:id",memberController.getOneById);
router.patch("/members",memberController.save);
router.post("/members",memberController.save);
router.delete("/member/:id",memberController.delete);

router.get("/categories",categoryController.getAll);
router.get("/category/:id",categoryController.getOneById);
router.patch("/categories",categoryController.save);
router.post("/categories",categoryController.save);
router.delete("/category/:id",categoryController.delete);

module.exports = router;