const pool = require("../db");

class Saving {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM saving;";
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
            text: "SELECT * FROM saving WHERE id=$1;",
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
                text:"INSERT INTO saving(label,amount,member_id) VALUES($1,$2,$3) RETURNING *;",
                values:[this.label,parseInt(this.amount,10),parseInt(this.member_id,10)]
            };

            if(this.id){
                sqlQuery.text = "UPDATE saving SET label=$1,amount=$2,member_id=$3 WHERE id=$4 RETURNING *";
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

    async delete(id){
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