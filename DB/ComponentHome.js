const config = require("./DBConfig");
const sql=require("mssql");

const getProductsCard = async()=>{
    try{
        let pool = await sql.connect(config);
        let pcards= pool.request().query(`select * from ProductCards pc where card_type=1 and status=0  order by newid() `);
        return pcards;
    }catch(e)
    {
        console.log(e);
    }
};

module.exports = {
    getProductsCard
}