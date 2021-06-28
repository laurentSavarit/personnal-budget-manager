const pool = require("../db");

/**
 * @typedef Saving 
 * @property {integer} id.required the id saving
 * @property {string} label.required the label of saving
 * @property {number} amount.required the amount of saving, default 0
 * @property {integer} member_id.required the id of member
 */
/**
 * @typedef savingPost 
 * @property {string} label.required the label of saving
 * @property {number} amount.required the amount of saving, default 0
 * @property {integer} member_id.required the id of member
 */
class Saving {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    /**
     * Find all savings in BDD
     * @async
     * @static
     * @returns {[Saving]} return an array with instances of savings
     */
    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM saving_with_details;";
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

    /**
     * Find one saving by id in BDD
     * @async
     * @static
     * @param {integer} id the id of saving 
     * @returns {Saving} an instance of Saving
     */
    static async findOne(id){

        try{
        const sqlQuery = {
            text: "SELECT * FROM saving_with_details WHERE id=$1;",
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

    /**
     * Save: insert or update in BDD
     * @async
     * @returns {Saving} return an instance of saving if insert
     */
    async save(){
        try{

            const sqlQuery = {
                text:"SELECT id FROM insert_saving($1);",
                values:[this]
            };

            if(this.id){
                sqlQuery.text = "SELECT update_saving($1);";
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

    /**
     * Delete in bdd by id
     * @param {integer} id the id of saving 
     * @returns {boolean} return true or false
     */
    static async delete(id){
        try{

          const sqlQuery = {
              text: "DELETE FROM saving WHERE id=$1",
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



module.exports = Saving;