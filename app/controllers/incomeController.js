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
    }

}

module.exports = incomeController;