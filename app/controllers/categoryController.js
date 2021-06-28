const Category = require("../models/category");

const categoryController = {

    /**
     * Get all elements categories
     * @async
     * @param {request} _ 
     * @param {response} res 
     * @returns {JSON} a json array, contain objects
     */
    getAll: async (_,res)=>{

        try{
        const results = await Category.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    /**
     * Get one category by id
     * @async
     * @param {request} req using id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {JSON} a object json
     */
    getOneById: async (req,res,next)=>{

        try{

        const {id} = req.params;
        
        const result = await Category.findOne(id);

        return res.status(200).json(result);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Save : update or create category object
     * @async
     * @param {request} req 
     * @param {response} res 
     * @returns {JSON} for new object return a json, for update return status 204
     */
    save: async (req,res)=>{

        try{
            const newCategory = new Category(req.body);

            const result = await newCategory.save();

            return result ? res.status(201).json(result) : res.status(204).end();

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Delete one category by id
     * @async
     * @param {request} req using id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {} return status 204 if success
     */
    delete: async (req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteCategory = await Category.delete(id);

            return deleteCategory ? res.status(204).end() : new Error("delete error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }
}

module.exports = categoryController;