const Income = require("../../models/income");

module.exports = {
    incomes: async ({id})=>{
        return Income.findAll(id)
    }
}