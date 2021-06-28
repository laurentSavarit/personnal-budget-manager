const {Router} = require("express");
const spentController = require("./controllers/spentController");
const incomeController = require("./controllers/incomeController");
const savingController = require("./controllers/savingController");
const memberController = require("./controllers/memberController");
const categoryController = require("./controllers/categoryController");
const Spent = require("./models/spent");
const Income = require("./models/income");
const Saving = require("./models/saving");
const Member = require("./models/member");
const Category = require("./models/category");

const router = Router();

/**
 * Get all spents
 * @route GET /spents
 * @group Spent
 * @returns {Array<Spent>} 200
 * @returns {Error} 500 internal error
 */
router.get("/spents",spentController.getAll);
/**
 * Get one spent with id
 * @route GET /spent/{id}
 * @group Spent
 * @param {number} id.path.required Spent ID to get
 * @returns {Spent.model} 200 an object Spent
 * @returns {Error} 500 internal error
 */
router.get("/spent/:id",spentController.getOneById);
/**
 * Patch one spent with props modify in the body
 * @route PATCH /spents
 * @group Spent
 * @param {Spent.model} spent.body.required modify props of spent, warning conserve the id
 * @returns {null} 204 return status 204 if update success
 */
router.patch("/spents",spentController.save);
/**
 * Post new spent, datas in body
 * @route POST /spents
 * @group Spent
 * @param {spentPost.model} spent.body.required new spent
 * @returns {Spent.model} 201 an object spent if ok
 * @returns {Error} 500 internal error
 */
router.post("/spents",spentController.save);
/**
 * Delete spent with id
 * @route DELETE /spent/{id}
 * @group Spent
 * @param {number} id.path.required Spent ID ti delete
 * @returns {null} 204 an status 204 if delete ok
 * @returns {Error} 500 internal error
 */
router.delete("/spent/:id",spentController.delete);





/**
 * Get all incomes
 * @route GET /incomes
 * @group Income
 * @returns {Array<Income>} 200 an array of income object
 * @returns {Error} 500 internal error
 */
router.get("/incomes",incomeController.getAll);
/**
 * Get one income with id
 * @route GET /income/{id}
 * @group Income
 * @param {number} id.path.required income ID to get
 * @returns {Income.model} 200 an income object
 * @returns {Error} 500 internal error
 */
router.get("/income/:id",incomeController.getOneById);
/**
 * Patch one income, datas in body
 * @route PATCH /incomes
 * @group Income
 * @param {Income.model} income.body.required props modify of income, warning to conserve the id
 * @returns {null} 204 an status 204 if update success
 * @returns {Error} 500 internal error
 */
router.patch("/incomes",incomeController.save);
/**
 * Post new income, datas in body
 * @route POST /incomes
 * @group Income
 * @param {incomePost.model} income.body.required new income
 * @returns {Income.model} 201 if success, an object income
 * @returns {error} 500 internal error
 */
router.post("/incomes",incomeController.save);
/**
 * Delete one income with id
 * @route DELETE /income/{id}
 * @group Income
 * @param {number} id.path.required Income ID to delete
 * @returns {null} 204 if success, an status 204
 * @returns {Error} 500 internal error
 */
router.delete("/income/:id",incomeController.delete);





/**
 * Get all savings
 * @route GET /savings
 * @group Saving
 * @returns {Array<Saving>} 200 an array of savings model
 * @returns {Error} 500 internal error
 */
router.get("/savings",savingController.getAll);
/**
 * Get one saving with id
 * @route GET /saving/{id}
 * @group Saving
 * @param {number} id.path.required Saving ID to get
 * @returns {Saving.model} 200 an saving object
 */
router.get("/saving/:id",savingController.getOneById);
/**
 * Patch one saving, data in body
 * @route PATCH /savings
 * @group Saving
 * @param {Saving.model} saving.body.required props of saving modify,conserve the id
 * @returns {null} 204 if success return a status 204
 * @returns {Error} 500 internal error
 */
router.patch("/savings",savingController.save);
/**
 * Post new saving, data in body
 * @route POST /savings
 * @group Saving
 * @param {savingPost.model} saving.body.required a new saving
 * @returns {null} 204 if success return a status 204
 * @returns {Error} 500 internal error
 */
router.post("/savings",savingController.save);
/**
 * Delete one saving with id
 * @route DELETE /saving/{id}
 * @group Saving
 * @param {number} id.path.required Saving ID to delete
 * @returns {null} 204 if delete success return a status 204
 * @returns {Error} 500 internal error
 */
router.delete("/saving/:id",savingController.delete);





/**
 * Get all members
 * @route GET /members
 * @group Member
 * @returns {Array<Member>} 200 an array of members model
 * @returns {Error} 500 internal error
 */
router.get("/members",memberController.getAll);
/**
 * Get one member with id
 * @route GET /member/{id}
 * @group Member
 * @param {number} id.path.required Member ID to get
 * @returns {Member.model} 200 an object member
 * @returns {Error} 500 internal error
 */
router.get("/member/:id",memberController.getOneById);
/**
 * Patch one member, datas in body
 * @route PATCH /members
 * @group Member
 * @param {Member.model} member.body.required props of member modify, conserve the id
 * @returns {null} 204 if update success return status 204
 * @returns {Error} 500 internal error
 */
router.patch("/members",memberController.save);
/**
 * Post new member, data in body
 * @route POST /members
 * @group Member
 * @param {memberPost.model} member.body.required a new member
 * @returns {Member.model} 201 if success, an object member
 * @returns {Error} 500 internal error
 */
router.post("/members",memberController.save);
/**
 * Delete one member with id
 * @route DELETE /member/{id}
 * @group Member
 * @param {number} id.path.required Member ID to delete
 * @returns {null} 204 if delete success return status 204
 * @returns {Error} 500 internal error
 */
router.delete("/member/:id",memberController.delete);





/**
 * Get all categories
 * @route GET /categories
 * @group Category
 * @returns {Array<Category>} 200 an array of categories models
 * @returns {Error} 500 internal error
 */
router.get("/categories",categoryController.getAll);
/**
 * Get one category with id
 * @route GET /category/{id}
 * @group Category
 * @param {number} id.path.required Category ID to get
 * @returns {Category.model} 200 an object category
 * @returns {Error} 500 internal error
 */
router.get("/category/:id",categoryController.getOneById);
/**
 * Path one category, data in body
 * @route PATCH /categories
 * @group Category
 * @param {Category.model} category.body.required props of category model modify, conserve the id
 * @returns {null} 204 if success return status 204
 * @returns {Error} 500 internal error
 */
router.patch("/categories",categoryController.save);
/**
 * Pot new category, data in body
 * @route POST /categories
 * @group Category
 * @param {categoryPost.model} category.body.required a new category
 * @returns {Category.model} 201 a new category object
 * @returns {Error} 500 internal error
 */
router.post("/categories",categoryController.save);
/**
 * Delete one category with id
 * @route DELETE /category/{id}
 * @group Category
 * @param {number} id.path.required Category ID to delete
 * @returns {null} 204 if success return status 204
 * @returns {Error} 500 internal error
 */
router.delete("/category/:id",categoryController.delete);

module.exports = router;