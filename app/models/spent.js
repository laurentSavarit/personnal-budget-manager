const pool = require("../db");

/**
 * @typedef Spent 
 * @property {integer} id.required The id income
 * @property {string} intern_ref.required Intern references of income
 * @property {string} label.required the label income
 * @property {number} amount.required the amount of income
 * @property {timestamptz} date.required the date of income, default now
 * @property {integer} member_id.required the id of income member
 * @property {integer} category_id.required the id of income category
 */
/**
 * @typedef spentPost 
 * @property {string} intern_ref.required Intern references of income
 * @property {string} label.required the label income
 * @property {number} amount.required the amount of income
 * @property {timestamptz} date.required the date of income, default now
 * @property {integer} member_id.required the id of income member
 * @property {integer} category_id.required the id of income category
 */
class Spent {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    /**
     * Find all spents in BDD
     * @static
     * @async
     * @returns {[Spent]} an array with instances of spents
     */
    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM spent_with_details;";
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
     * Find one spent in BDD
     * @static
     * @async
     * @param {integer} id the id of spent 
     * @returns {Spent} an instance of Spent
     */
    static async findOne(id){

        try{
        const sqlQuery = {
            text: "SELECT * FROM spent_with_details WHERE id=$1;",
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
     * @returns {Spent} return an instance of spent if insert
     */
    async save(){
        try{

            const sqlQuery = {
                text:"SELECT id FROM insert_spent($1);",
                values:[this]
            };

            if(this.id){
                sqlQuery.text = "SELECT update_spent($1);";
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
     * Delete one spent in BDD by id
     * @async
     * @static
     * @param {integer} id the id of spent 
     * @returns {boolean} return true or false
     */
    static async delete(id){
        try{

          const sqlQuery = {
              text: "DELETE FROM spent WHERE id=$1",
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



module.exports = Spent;