const Member = require("../models/member");

const memberController = {

    getAll: async (_,res)=>{

        try{
        const results = await Member.findAll();

        return res.status(200).json(results);

        }catch(err){
            console.error(err);
            res.status(500).json("internal error");
        }
    },

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