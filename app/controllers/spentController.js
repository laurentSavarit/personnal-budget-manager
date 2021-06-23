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
    }

}

module.exports = spentController;