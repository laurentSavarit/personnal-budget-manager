const Saving = require("../models/saving");

const savingController = {

    /**
     * Get all savings
     * @async
     * @param {request} _ 
     * @param {response} res 
     * @returns {JSON} an array of objects saving
     */
    getAll: async (_,res)=>{

        try{
        const results = await Saving.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    /**
     * Get on object saving by id
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {JSON} an object json 
     */
    getOneById: async (req,res,next)=>{

        try{

        const {id} = req.params;
        
        const result = await Saving.findOne(id);

        return res.status(200).json(result);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Save: create or update saving
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @returns {JSON} return an object json of create, status code 204 if update
     */
    save: async (req,res)=>{

        try{
            const newSaving = new Saving(req.body);

            const result = await newSaving.save();

            return result ? res.status(201).json(result) : res.status(204).end();

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Delete one saving by id
     * @async
     * @param {request} req 
     * @param {response} res 
     * @param {*} next 
     * @returns {} a status code 204 if success
     */
    delete: async (req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteSaving = await Saving.delete(id);

            return deleteSaving ? res.status(204).end() : new Error("delete error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }

}

module.exports = savingController;