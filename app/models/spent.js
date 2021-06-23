const pool = require("../db");

class Spent {


    constructor(obj={}){
        for(const prop in obj){
            this[prop] = obj[prop];
        };
    };

    static async findAll(){

        try{
        const sqlQuery = "SELECT * FROM spent;";
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
            text: "SELECT * FROM spent WHERE id=$1;",
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
                text:"INSERT INTO spent(intern_ref,label,amount,date,member_id,category_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
                values:[this.intern_ref,this.label,parseInt(this.amount,10),this.date,parseInt(this.member_id,10),parseInt(this.category_id,10)]
            };

            if(this.id){
                sqlQuery.text = "UPDATE spent SET intern_ref=$1,label=$2,amount=$3,date=$4,member_id=$5,category_id=$6 WHERE id=$7 RETURNING *";
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