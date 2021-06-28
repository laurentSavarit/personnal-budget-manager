const Income = require("../models/income");

const incomeController = {

    /**
     * Get all incomes
     * @async
     * @param {request} _ not using
     * @param {response} res 
     * @returns {JSON} an array of objects income in JSON
     */
    getAll: async (_,res)=>{

        try{
        const results = await Income.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    /**
     * Get on incoe by ID
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {JSON} object income in json
     */
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

    /**
     * Save: update or create an object income
     * @async
     * @param {request} req 
     * @param {response} res 
     * @returns {JSON} return a json if create, a status code 204 if update
     */
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

    /**
     * Delete a income object by id
     * @async
     * @param {request} req using the id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {} if success a status code 204
     */
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