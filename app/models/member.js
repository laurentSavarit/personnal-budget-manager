const pool = require("../db");

/**
 * @typedef Member 
 * @property {integer} id.required the member id
 * @property {string} first_name.required 
 * @property {string} last_name.required
 * @property {email} email.required the member email
 * @property {string} password.required the member password
 * @property {string} role.required the member role 
 */
/**
 * @typedef memberPost 
 * @property {string} first_name.required 
 * @property {string} last_name.required
 * @property {email} email.required the member email
 * @property {string} password.required the member password
 * @property {string} role.required the member role 
 */
class Member {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM member;";
        const {rows} = await pool.query(sqlQuery);

        return rows.map(row=>new this(row));

        }catch(err){
            if(err.detail){
                throw new Error(err.detail);
            }else{
                throw err;
            }
        }
    };

    static async findOne(id){

        try{
        const sqlQuery = {
            text: "SELECT * FROM member WHERE id=$1;",
            values: [id]
        };
        const {rows} = await pool.query(sqlQuery);

        return rows[0] ? new this(rows[0]) : new Error("id not found");

        }catch(err){
            if(err.detail){
                throw new Error(err.detail);
            }else{
                throw err;
            }
        }
    };

    async save(){
        try{

            const sqlQuery = {
                text:"SELECT id FROM insert_member($1);",
                values:[this]
            };

            if(this.id){
                sqlQuery.text = "SELECT update_member($1);";
            }

            const {rows} = await pool.query(sqlQuery);

            if(!this.id){
                this.id = rows[0].id;
                return this;
            }else{
                return;
            }

        }catch(err){
            if(err.detail){
                throw new Error(err.detail);
            }else{
                throw err;
            }
        }
    };

    async delete(id){
        try{

          const sqlQuery = {
              text: "DELETE FROM member WHERE id=$1",
              values:[parseInt(id,10)]
          };
          
          const {rowCount} = await pool.query(sqlQuery);

          return rowCount ? true : false;

        }catch(err){
            if(err.detail){
                throw new Error(err.detail);
            }else{
                throw err;
            }
        } 
    }
}



module.exports = Member;