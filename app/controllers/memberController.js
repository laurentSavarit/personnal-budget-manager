const Member = require("../models/member");

const memberController = {

    /**
     * Get all members
     * @async
     * @param {request} _ not used
     * @param {response} res 
     * @returns {JSON} an array of objects member
     */
    getAll: async (_,res)=>{

        try{
        const results = await Member.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

    /**
     * Get one object by id
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {JSON} an object json
     */
    getOneById: async (req,res,next)=>{

        try{

        const {id} = req.params;
        
        const result = await Member.findOne(id);

        return res.status(200).json(result);

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Save: create or update member
     * @async
     * @param {request} req 
     * @param {response} res 
     * @returns {jSON} return object json for create, status code 204 for update
     */
    save: async (req,res)=>{

        try{
            const newMember = new Member(req.body);

            const result = await newMember.save();

            return result ? res.status(201).json(result) : res.status(204).end();

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    /**
     * Delete one member by id
     * @async
     * @param {request} req use id in param of request
     * @param {response} res 
     * @param {*} next 
     * @returns {} return a status code 204 if success
     */
    delete: async (req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteMember = await Member.delete(id);

            return deleteMember ? res.status(204).end() : new Error("delete error");

        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    }

}

module.exports = memberController;