const Category = require("../models/category");

const categoryController = {

    getAll: async (_,res)=>{

        try{
        const results = await Category.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

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

    insert: async (req,res)=>{

        try{
            const newCategory = new Category(req.body);

            const result = await newCategory.save();

            return result ? res.status(201).json(result) : new Error("insert error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    update: async (req,res)=>{

        try{
            const updateCategory = new Category(req.body);

            const result = await updateCategory.save();

            return result ? res.status(201).json(result) : new Error("update error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

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