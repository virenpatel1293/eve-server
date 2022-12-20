const config = require("./DBConfig");
const sql=require("mssql");

const getPCById = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let product = pool.request().query(`exec GetProductByIDV2 ${pid} `);
        return product;
    }
    catch(e){
        console.log(e);
    }
};

const getPCData = async(pid) =>{
    try{
        let pool = await sql.connect(config);
        let pcData = pool.request().query(`select MainImage,BannerImage,Performance,IsFPS from Product where ProductId=${pid}`);
        return pcData;
    }catch(e){
        console.log(e);
    }
}

const getPCProductCards = async(pid) =>{
    try{
        let pool = await sql.connect(config);
        let pcCards = pool.request().query(`select  * from ProductCards pc inner join ProductCardsLink pcl on pcl.cardId = pc.id and pcl.productId = ${pid} order by pcl.priority`);
        return pcCards;
    }catch(e){
        console.log(e);
    }
}

const getFreeStuffInfo = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let product = pool.request().query(`exec Get_free_stuff_info ${pid},1 `);
        return product;
    }
    catch(e){
        console.log(e);
    }
};

const getBundlesInfo = async(pid) => {
    try{
        let pool = await sql.connect(config);
        let bundleData = pool.request().query(`select  BundleTitle, BundleOptions.OptionId, OptionTitle, CategoryIDs from BundleOptions inner join Bundles on Bundles.BundleID =  BundleOptions.BundleId inner join ProductBundleOptions on ProductBundleOptions.BundleID = Bundles.BundleID and ProductBundleOptions.OptionID = BundleOptions.OptionID where  ProductBundleOptions.ProductId =  ${pid}  order by Bundles.Priority asc `);
        return bundleData;
    }catch(e){
        console.log(e);
    }
}

const getBundlesOptionInfo = async(optionId) => {
    try{
        let pool = await sql.connect(config);
        let bundleData = pool.request().query(`select * from (select b.*, case when b.ProductID = 0 then 'In Stock with Evetech' else p.Availability end Availability  from BundleOptionDetail b left join Product p on p.ProductID = b.ProductID where OptionId = ${optionId} ) a where Availability in ('In Stock with Evetech') order by isDefault desc , CAST(OptionPrice as float)  asc `);
        return bundleData;
    }catch(e){
        console.log(e);
    }
}

const getBundlesOptionIdsInfo = async(optionIds) => {
    try{
        let pool = await sql.connect(config);
        let bundleData = pool.request().query(`select * from (select b.*, case when b.ProductID = 0 then 'In Stock with Evetech' else p.Availability end Availability  from BundleOptionDetail b left join Product p on p.ProductID = b.ProductID where OptionId in (${optionIds}) ) a where Availability in ('In Stock with Evetech') order by isDefault desc , CAST(OptionPrice as float)  asc `);
        return bundleData;
    }catch(e){
        console.log(e);
    }
}

const getFPSFilterData = async(productId) => {
    try{
        let pool = await sql.connect(config);
        let filterData = pool.request().query(`select prodFilters from ProductOverview  where productid  = ${productId} `);
        return filterData;
    }catch(e)
    {
        console.log(e);
    }
}


module.exports = {
    getPCById,
    getPCData,
    getPCProductCards,
    getFreeStuffInfo,
    getBundlesInfo,
    getBundlesOptionInfo,
    getBundlesOptionIdsInfo,
    getFPSFilterData 
}