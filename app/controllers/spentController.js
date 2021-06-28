const Spent = require("../models/spent");

const spentController = {

    /**
     * Get all spents
     * @async
     * @param {request} _ 
     * @param {response} res 
     * @returns {JSON} return an array of objects spent
     */
    getAll: async (_,res)=>{

        try{
        const results = await Spent.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    /**
     * Get one object spent by id
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {JSON} return an object spent
     */
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

    /**
     * Save: create or update spent
     * @async
     * @param {request} req 
     * @param {response} res 
     * @returns {JSON} return an object spent if create, status code 204 if update
     */
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

    /**
     * Delete a object spent by id
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {} if success return status code 204
     */
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