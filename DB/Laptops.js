const config = require('./DBConfig');
const sql = require('mssql');

const getLaptopById = async(npid) => {
    try{
        let pool = await sql.connect(config);
        let products = pool.request().query(`EXECUTE Get_Mobile_Product_ByPID '${npid}'`);
        return products;
    }
    catch(e){
        console.log(e);
    }
};

const getLaptopGalleryById = async(npid)=>{
    try{
        let pool = await sql.connect(config);
        let gallery =  pool.request().query(`exec Get_Laptop_Gallery_by_id ${npid}`);
        return gallery;
    }
    catch(e){
        console.log(e);
    }
}

const getSimilarLinksBylinkId = async(linkId) => {
    try{
        let pool = await sql.connect(config);
        let links =  pool.request().query(`exec Get_Product_Links_ByID ${linkId}`);
        return links;
    }
    catch(e){
        console.log(e);
    }
}

const getSpecifications = async(npid) => {
    try{
        let pool = await sql.connect(config);
        let specs = pool.request().query(`SELECT id ,pid ,Specid ,Spec ,sort ,status ,AddedDate ,(select * from NProSpecDetail as nd where nd.SpecID =ns.Specid and nd.PID = ns.pid for JSON PATH ) as Specifications FROM NProSpec as ns where pid = ${npid}`);
        return specs;
    }
    catch(e){
        console.log(e);
    }
}

const getReviews = async(npid,linkId,status) =>{
    try{
        let pool = await sql.connect(config);
        let reviews = pool.request().query(`exec Get_Product_Reviews_LinkID ${npid},${linkId},${status}`);
        return reviews;
    }
    catch(e){
        console.log(e)
    }
}   

const getBundles = async(npid)=>{
    try{
        let pool = await sql.connect(config);
        let bundles = pool.request().query(`exec Get_nPRO_Bundles ${npid}`);
        return bundles;
    }catch(e){
        console.log(e);
    }
}

const getLaptopBundles = async(npid) => {
    try{
        let pool = await sql.connect(config);   
        let laptopBundles = pool.request().query(`exec Get_Config_Laptop_Info_From_Components`);
        return laptopBundles;
    }
    catch(e){
        console.log(e);
    }
}

const getAttributesValues = async(pid)=>{
    try{
        let pool= await sql.connect(config);
        let prodAttributes = pool.request().query(`exec get_pro_attributes_visible ${pid},3`);
        return prodAttributes;
    }catch(e){
        console.log(e);
    }
}

const getLaptopBackpacks = async(optionId)=>{
    try{
        let pool= await sql.connect(config);
        let backpacks = pool.request().query(`select top(4) * from (select n.*,p.ProductImage,p.IsAvailable,p.ProductSku,p.Availability,p.ProductHighlight,p.Status,p.Title as pTitle   from NProBackPacks n inner join Product p on p.ProductID = n.pid where n.parentId ='${optionId}' or id='${optionId}' ) backpack where isActive=0 and Status=1 order by price asc `);
        return backpacks;
    }catch(e){
        console.log(e);
    }
}

const getLaptopFreeStuff = async(pid)=>{
    try{
        let pool= await sql.connect(config);
        let freeStuffs = pool.request().query(`exec Get_free_stuff_info ${pid},3`);
        return freeStuffs;
    }catch(e){
        console.log(e);
    }
}

const getLaptopFPSData = async(linkid)=>{
    try{
        let pool= await sql.connect(config);
        let fpsData = pool.request().query(`select * from NProFPS where isFeatured = ${linkid}`);
        return fpsData;
    }catch(e){
        console.log(e);
    }
}


module.exports = {
    getLaptopById,
    getLaptopGalleryById,
    getSimilarLinksBylinkId,
    getSpecifications,
    getReviews,
    getBundles,
    getLaptopBundles,
    getAttributesValues,
    getLaptopBackpacks,
    getLaptopFreeStuff,
    getLaptopFPSData
}