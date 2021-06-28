const Spent = require("../models/spent");

const spentController = {

    
    getAll: async (_,res)=>{

        try{
        const results = await Spent.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    getOneById: async (req,res,next)=>{

        try{

        const {id} = req.params;
        
        const result = await Spent.findOne(id);

        return res.status(200).json(result);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    save: async (req,res)=>{

        try{
            const newSpent = new Spent(req.body);

            const result = await newSpent.save();

            return result ? res.status(201).json(result) : res.status(204).end();

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    delete: async (req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteSpent = await Spent.delete(id);

            return deleteSpent ? res.status(204).end() : new Error("delete error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }

}

module.exports = spentController;