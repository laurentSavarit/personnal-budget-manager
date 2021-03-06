const pool = require("../db");

/**
 * @typedef Income 
 * @property {integer} id.required The id income
 * @property {string} intern_ref.required Intern references of income
 * @property {string} label.required the label income
 * @property {number} amount.required the amount of income
 * @property {timestamptz} date.required the date of income, default now
 * @property {integer} member_id.required the id of income member
 * @property {integer} category_id.required the id of income category
 */
/**
 * @typedef incomePost 
 * @property {string} intern_ref.required Intern references of income
 * @property {string} label.required the label income
 * @property {number} amount.required the amount of income
 * @property {timestamptz} date.required the date of income, default now
 * @property {integer} member_id.required the id of income member
 * @property {integer} category_id.required the id of income category
 */
class Income {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    /**
     * Find all incomes in BDD
     * @static
     * @async
     * @returns {[Income]} return an array with instances of income
     */
    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM income_with_details;";
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
     * Find one income by id in BDD
     * @async
     * @static
     * @param {integer} id the id of income
     * @returns {Income} an instance of Income
     */
    static async findOne(id){

        try{
        const sqlQuery = {
            text: "SELECT * FROM income_with_details WHERE id=$1;",
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
     * Save: insert or update income in BDD
     * @async
     * @returns {Income} return an instance of income if insert
     */
    async save(){
        try{

            const sqlQuery = {
                text:"SELECT id FROM insert_income($1);",
                values:[this]
            };

            if(this.id){
                sqlQuery.text = "SELECT update_income($1);";
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
     * Delete in BDD by id
     * @param {integer} id the id of income
     * @static
     * @async
     * @returns {boolean} return true or false
     */
    static async delete(id){
        try{

          const sqlQuery = {
              text: "DELETE FROM income WHERE id=$1",
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



module.exports = Income;