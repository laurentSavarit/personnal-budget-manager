const Income = require("../models/income");

const incomeController = {

    getAll: async (_,res)=>{

        try{
        const results = await Income.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    getOneById: async (req,res,next)=>{

        try{

        const {id} = req.params;
        
        const result = await Income.findOne(id);

        return res.status(200).json(result);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },
    save: async (req,res)=>{

        try{
            const newIncome = new Income(req.body);

            const result = await newIncome.save();

            return result ? res.status(201).json(result) : res.status(204).end();

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    delete: async (req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteIncome = await Income.delete(id);

            return deleteIncome ? res.status(204).end() : new Error("delete error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }

}

module.exports = incomeController;