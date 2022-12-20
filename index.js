const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const dbOperation = require("./DB/DBOperation");
const dbLaptop = require('./DB/Laptops');
const dbPages = require('./DB/Pages');
const dbComponent = require('./DB/Component');
const dbPc = require('./DB/PC');
const dbComponentHome = require('./DB/ComponentHome');
const dbBenchmark = require('./DB/Benchmark');
const bodyParser = require('body-parser');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
let client;
let session;
app.use(cors());

/* Landing Section */
app.post('/getProductCards',async(req,res)=>{
    const prodCards = await dbComponentHome.getProductsCard().then(async res=>{
        return res.recordsets[0];        
    });

    res.send({result:prodCards});
});
/* Landing Section */

app.post('/byQueryId',async(req,res) => {
    const prodData = await dbOperation.getQueryById(req.body.queryId).then(async res=>{
        let query = res.recordset[0].queryStr;
        let data;
        if(query){
           data= await dbOperation.getDataByQuery(query).then(res=>{
             return res.recordsets[0];        
           });
        }
        return data;
    });
    res.send({result:prodData});
});

app.get('/laptopById/:npid',async(req,res)=>{
    let npid = req.params.npid;  
    const laptop = await dbLaptop.getLaptopById(npid).then(async res=>{
        return res.recordsets[0];
    });
    
    res.send({result:laptop});
});

app.get('/laptopGalleryById/:npid',async(req,res) => {
    let npid =  req.params.npid;
    const gallery = await dbLaptop.getLaptopGalleryById(npid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:gallery});
});

app.get('/laptopSimilarLinks/:linkid',async(req,res) => {
    let linkid =  req.params.linkid;
    const links = await dbLaptop.getSimilarLinksBylinkId(linkid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:links});
});

app.get('/laptopSpecifications/:npid',async(req,res) => {
    let npid = req.params.npid
    const specs = await dbLaptop.getSpecifications(npid).then(async res =>{
        return res.recordsets[0];
    });

    res.send({result:specs});
});

app.get('/laptopReviews/:npid/:linkid/:status',async(req,res) => {
    let npid = req.params.npid;
    let linkid = req.params.linkid;
    let status = req.params.status;

    const reviews = await dbLaptop.getReviews(npid,linkid,status).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:reviews});
});

app.get('/laptopBundles/:npid',async(req,res)=>{
    let npid= req.params.npid;

    const bundles = await dbLaptop.getBundles(npid).then(async res=>{
        const bundleData = res.recordsets[0];

        const laptopBundles =await dbLaptop.getLaptopBundles().then(async res=>{
            return res.recordsets[0];
        });

        /* return [...bundleData, ...laptopBundles];   */

        if(laptopBundles)
            return [bundleData, laptopBundles];    
        else
            return bundleData;
    });

    res.send({result:bundles});
});

app.get('/laptopBackPacks/:optionId',async(req,res)=>{
    let optionId= req.params.optionId;

    const backpacks = await dbLaptop.getLaptopBackpacks(optionId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:backpacks});
});

app.get('/laptopFreeStuff/:npid',async(req,res)=>{
    let npid= req.params.npid;
    const freeStuff = await dbLaptop.getLaptopFreeStuff(npid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:freeStuff});
});

app.get('/laptopFPSData/:linkId',async(req,res)=>{
    let linkId= req.params.linkId;
    const fpsData = await dbLaptop.getLaptopFPSData(linkId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:fpsData});
});

app.get('/LaptopAttributesValue/:npid',async(req,res)=>{
    let npid= req.params.npid;

    const prodAttributes = await dbLaptop.getAttributesValues(npid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:prodAttributes});
});

app.get('/Pages/:PageId',async(req,res)=>{
    let pageId = req.params.PageId;

    const pageData =  await dbPages.getPageInfoById(pageId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({"result":pageData});
});

/* Component */

app.get('/ComponentById/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;

    const prodData = await dbComponent.getComponentById(productId).then(async res=>{
        return res.recordsets[0];        
    });

    res.send({"result":prodData});
});

app.get('/ComponentOverview/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;

    const prodOverview = await dbComponent.getComponentOverview(productId).then(async res=>{
        return res.recordsets[0];        
    });

    res.send({"result":prodOverview});
});

app.get('/ComponentGallery/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;

    const gallery = await dbComponent.getComponentGallery(productId).then(async res=>{
        return res.recordsets[0];        
    });

    res.send({"result":gallery});
});

app.get('/ComponentSimilarProducts/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;

    const similarProd = await dbComponent.getSimilarProducts(productId).then(async res=>{
        return res.recordsets[0];        
    });

    res.send({"result":similarProd});
});

app.get('/ComponentAttributesValue/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;

    const prodAttributes = await dbComponent.getAttributesValues(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:prodAttributes});
});


app.post('/UpgradeKitOverview',async(req,res)=>{
    const prodOverviews = await dbComponent.getUpgradeKitOverviewByIds(req.body.OverviewIds).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:prodOverviews});
});

app.get('/UpgradeKitItems/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const upgradeItems = await dbComponent.getUpgradeKitItems(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:upgradeItems});
});

app.post('/FreeStuffInfo',async(req,res)=>{
    let productId = req.body.ProductId;
    let atype = req.body.atype;
    const upgradeItems = await dbComponent.getFreeStuffInfo(productId,atype).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:upgradeItems});
});

/* PC Section */

app.get('/getPCById/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const pc = await dbPc.getPCById(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:pc});
});

app.get('/getPCData/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const pcData = await dbPc.getPCData(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:pcData});
});


app.get('/getPCProductCards/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const pcCards = await dbPc.getPCProductCards(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:pcCards});
});

app.get('/getPCFreeStuffInfo/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const freeStuff = await dbPc.getFreeStuffInfo(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:freeStuff});
});

app.get('/getBundlesInfo/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const freeStuff = await dbPc.getBundlesInfo(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:freeStuff});
});

app.get('/getBundleOptions/:OptionId',async(req,res)=>{
    let OptionId = req.params.OptionId;
    const bundleOptions = await dbPc.getBundlesOptionInfo(OptionId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:bundleOptions});
});

app.post('/getBundleOptionsByIds',async(req,res)=>{
    let OptionIds = req.body.OptionIds;
    const bundleOptions = await dbPc.getBundlesOptionIdsInfo(OptionIds).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:bundleOptions});
});

app.get('/getFPSFilterData/:ProductId',async(req,res)=>{
    let productId = req.params.ProductId;
    const filterData = await dbPc.getFPSFilterData(productId).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:filterData});
});


/* Benchmark Data */
app.get('/getPcGameData',async(req,res)=>{
    const pcGameData = await dbBenchmark.getPcGameData().then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:pcGameData});
});

app.get('/getLaptopGameData',async(req,res)=>{
    const pcLaptopData = await dbBenchmark.getLaptopGameData().then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:pcLaptopData});
});


app.get('/getGPUList',async(req,res)=>{
    const gpuData = await dbBenchmark.getGPUList().then(async res=>{
        return res;
    });

    res.send({result:gpuData});
});

app.get('/getCPUList',async(req,res)=>{
    const cpuData = await dbBenchmark.getCPUList().then(async res=>{
        return res;
    });

    res.send({result:cpuData});
});

app.get('/getGameList',async(req,res)=>{
    const gameData = await dbBenchmark.getGameList().then(async res=>{
        return res;
    });

    res.send({result:gameData});
});

app.post('/getRecalculatePerformance',async(req,res)=>{
    let estimator = req.body.estimator;
    const estimateData = await dbBenchmark.getRecalculatePerformance(estimator).then(async res=>{
        return res;
    });

    res.send({result:estimateData});
});

/* Dynamic Pages */
app.post('/PCByCategoryID',async(req,res)=>{
    let categoryParams = req.body.categoryParams;
   
    const estimateData = await dbPages.getPCByCategoryID(categoryParams).then(async res=>{
        return res.recordset;
    });
    res.send({result:estimateData});
});

app.get('/getCategoryById/:CategoryId',async(req,res)=>{
    let categoryID = req.params.CategoryId;
    const categoryData = await dbPages.getCategoryByID(categoryID).then(async res=>{
        return res.recordsets[0];
    });
    res.send({result:categoryData});
});



app.listen(API_PORT,()=>{ console.log(`listening on port ${API_PORT}`)});

