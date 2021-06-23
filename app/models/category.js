const pool = require("../db");

class Category {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

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

    async save(){
        try{

            const sqlQuery = {
                text:"INSERT INTO category(label) VALUES($1) RETURNING *;",
                values:[this.label]
            };

            if(this.id){
                sqlQuery.text = "UPDATE category SET label=$1 WHERE id=$2 RETURNING *";
                sqlQuery.values.push(parseInt(this.id,10))
            }

            const {rows} = await pool.query(sqlQuery);

            return rows[0] ? this : new Error("internal error...");

        }catch(err){
            if(err.detail){
                throw new Error(err.detail);
            }else{
                throw err;
            }
        }
    };

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