const pool = require("../db");
/**
 * @typedef Category
 * @property {integer} id.required the category id
 * @property {string} label.required the label of category
 */
/**
 * @typedef categoryPost
 * @property {string} label.required the label of category
 */
class Category {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    /**
     * Find all categories
     * @static
     * @async
     * @returns {[Category]} an array of category instance
     */
    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM category;";
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
     * Find one category by id in BDD
     * @param {integer} id 
     * @static
     * @async
     * @returns {Category} return one category instance
     */
    static async findOne(id){

        try{
        const sqlQuery = {
            text: "SELECT * FROM category WHERE id=$1;",
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
     * Save : insert or update in BDD
     * @async
     * @returns {Category} if create return an instance of Category
     */
    async save(){
        try{

            const sqlQuery = {
                text:"SELECT id FROM insert_category($1);",
                values:[this]
            };

            if(this.id){
                sqlQuery.text = "SELECT update_category($1);";
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
     * Delete a category in BDD by id
     * @param {integer} id the if of category
     * @static
     * @async
     * @returns {boolean} return true or false
     */
    static async delete(id){
        try{

          const sqlQuery = {
              text: "DELETE FROM category WHERE id=$1",
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



module.exports = Category;