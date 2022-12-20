const config = require("./DBConfig");
const sql=require("mssql");

const getComponentById = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let product = pool.request().query(`exec Get_Product_Component ${pid} `);
        return product;
    }
    catch(e){
        console.log(e);
    }
};

const getComponentOverview = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let overview = pool.request().query(`select Overview,aboutPro from ProductOverview where ProductID=${pid}`);
        return overview;
    }catch(e){
        console.log(e);
    }
};

const getComponentGallery = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let overview = pool.request().query(`exec Get_componentGallery_by_id ${pid} `);
        return overview;
    }catch(e){
        console.log(e);
    }
};

const getSimilarProducts = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let similarProds = pool.request().query(`exec Get_similar_products_PID_Comp_TAGS_V1 ${pid} `);
        return similarProds;
    }catch(e){
        console.log(e);
    }
};

const getAttributesValues = async(pid)=>{
    try{
        let pool= await sql.connect(config);
        let prodAttributes = pool.request().query(`exec get_pro_attributes_visible ${pid},1`);
        return prodAttributes;
    }catch(e){
        console.log(e);
    }
}

const getUpgradeKitOverviewByIds = async(ovids)=>{
    try{
        let pool= await sql.connect(config);
        let prodOverviews = pool.request().query(`exec Get_upgradekit_overview_by_ids '${ovids}'`);
        return prodOverviews;
    }catch(e){
        console.log(e);
    }
}

const getUpgradeKitItems = async(productId)=>{
    try{
        let pool= await sql.connect(config);
        let upgradeItems = pool.request().query(`exec getproductItems '${productId}'`);
        return upgradeItems;
    }catch(e){
        console.log(e);
    }
}

const getFreeStuffInfo = async(productid,atype)=>{
    try{
        let pool= await sql.connect(config);
        let freeStuffInfo = pool.request().query(`exec Get_free_stuff_info '${productid}','${atype}'`);
        return freeStuffInfo;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    getComponentById,
    getComponentOverview,
    getComponentGallery,
    getSimilarProducts,
    getAttributesValues,
    getUpgradeKitOverviewByIds,
    getUpgradeKitItems,
    getFreeStuffInfo
}

