const pool = require("../db");

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
                text:"INSERT INTO member(first_name,last_name,email,password,role) VALUES($1,$2,$3,$4,$5) RETURNING *;",
                values:[this.first_name,this.last_name,this.email,this.password,this.role]
            };

            if(this.id){
                sqlQuery.text = "UPDATE member SET first_name=$1,last_name=$2,email=$3,password=$4,role=$5 WHERE id=$6 RETURNING *";
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