const config = require('./DBConfig');
const sql = require('mssql');

const getPageInfoById = async (PageId) =>{
    try{
        let pool = await sql.connect(config);
        let pageData = pool.request().query(`exec Get_Page_By_URLID ${PageId}`);
        return pageData;
    }catch(e)
    {
        console.log(e);
    }
}

const getPCByCategoryID = async (CategoryParams) =>{
    let cat = CategoryParams;
    try{
        let pool = await sql.connect(config);
        let pageData = pool.request().query(`exec GetProductsByCateogryIDv2 ${cat.categoryID},${cat.ProductCount},'${cat.CategoryName}','${cat.CategoryDes}','${cat.Keywords}','${cat.Title}','${cat.MetaDes}',${cat.SortOrder},${cat.StartValue},${cat.EndValue}`);
        return pageData;
    }catch(e)
    {
        console.log(e);
    }
}


const getCategoryByID = async (categoryID) =>{
    try{
        let pool = await sql.connect(config);
        let catData = pool.request().query(`select  name, Description, TitleText, MetaDescription, keyword FROM category where categoryid = ${categoryID}`);
        return catData;
    }catch(e)
    {
        console.log(e);
    }
}

module.exports = {
    getPageInfoById,
    getPCByCategoryID,
    getCategoryByID    
}