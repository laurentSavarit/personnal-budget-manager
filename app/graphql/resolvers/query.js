const Member = require("../../models/member");

module.exports = {
    member: async (_,{id})=>{
        return Member.findOne(id);
    }
}