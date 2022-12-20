const config = require('./DBConfig'),
      sql = require('mssql');

const getProducts = async()=>{

    try{
        let pool = await sql.connect(config);
        let products = pool.request().query("select top(30) * from (SELECT distinct   p.NAME as product_name, p.npid  as product_id, dbo.Get_npro_brandurl(p.npid, p.brandid) AS brandurl, p.brandid, dbo.Get_npro_brand(p.npid, p.brandid) AS Brand, dbo.Get_npro_brandlogourl(p.npid, p.brandid) AS LogoUrlSmall, p.url as product_url, p.status, p.imageurl as product_img_url, p.imageurl AS product_sml_img_url, '3' as product_type, dbo.Get_npro_status(p.npid, p.statusid)  AS StockStatus, p.isspecial, p.price as product_price, p.shipcostid, p.oldprice as product_old_price, p.code as product_sku, p.statusid, dbo.[Get_mobile_highlights_top4] (p.npid)    AS high, dbo.Getproreviewcount(p.npid) AS ReviewCount, dbo.Getproreviewstartotal(p.npid) AS TotalReviewStars, p.NAME AS reviewheading FROM   dbo.npro p where p.status = 1 and isspecial = 1 ) pp order by NEWID()");
        return products;
    }
    catch(e){
        console.log(e);
    }
}

const getQueryById = async(QueryId)=>{

    try{
        let pool = await sql.connect(config);
        let products = pool.request().query(` select queryStr from blog_pro_query where queryid = ${QueryId}`);
        return products;
    }
    catch(e){
        console.log(e);
    }
}

const getDataByQuery = async(Query)=>{

    try{
        let pool = await sql.connect(config);
        let products = pool.request().query(`${Query}`);
        return products;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    getProducts,
    getQueryById,
    getDataByQuery
}