const config = require("./DBConfig");
const sql=require("mssql");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config()

const API_KEY = process.env.REACT_APP_EVE_BENCHMARK_API_KEY;
const API_SECRET = process.env.REACT_APP_EVE_BENCHMARK_API_SECRET;
const API_URL = process.env.REACT_APP_EVE_BENCHMARK_API_URL;

const getAuthHeader = (method,url,nonce) => {
    let singString = `(request-target): ${method} ${url} date: ${nonce}`.toLowerCase();
    let signature = CryptoJS.HmacSHA1(singString,API_SECRET);
    return `Signature keyId=${API_KEY},algorithm=hmac-sha1,headers=(request-target) date,nonce=${nonce},signature=${signature}`;
}

const getPcGameData = async() => {
    try{
        let pool = await sql.connect(config);
        let pcGameData = pool.request().query(`select id,gameTitle,gameImg,Status from FPSGames where pcStatus =1 order by pcPriority asc`);
        return pcGameData;
    }
    catch(e){
        console.log(e);
    }
}

const getGameData = async() => {
    try{
        let pool = await sql.connect(config);
        let gameData = pool.request().query(`select id,gameTitle,gameImg,Status from FPSGames`);
        return gameData;
    }
    catch(e){
        console.log(e);
    }
}

const getLaptopGameData = async() => {
    try{
        let pool = await sql.connect(config);
        let lapGameData = pool.request().query(`select id,gameTitle,gameImg,Status from FPSGames where Status =1 order by Priority asc `);
        return lapGameData;
    }
    catch(e){
        console.log(e);
    }
}

const getGPUList = async() => {
    let nonce = Math.round((new Date()).getTime() / 1000);
    let authorization = getAuthHeader("GET","/api/list-gpu",nonce);
    try{
        const gpuData = await fetch(`${API_URL}list-gpu`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept' : 'application/json',
                'nonce' : nonce,
                'authorization' : authorization,
                'X-Api-Key' : API_KEY
            }
        })
        .then(res=>res.json());
        return gpuData;
    }
    catch(e){
        console.log(e);
        return [];
    }
}

const getCPUList = async() => {
    let nonce = Math.round((new Date()).getTime() / 1000);
    let authorization = getAuthHeader("GET","/api/list-cpu",nonce);
    try{
        const gpuData = await fetch(`${API_URL}list-cpu`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept' : 'application/json',
                'nonce' : nonce,
                'authorization' : authorization,
                'X-Api-Key' : API_KEY
            }
        })
        .then(res=>res.json());
        return gpuData;
    }
    catch(e){
        console.log(e);
        return [];
    }
}

const getGameList = async() => {
    let nonce = Math.round((new Date()).getTime() / 1000);
    let authorization = getAuthHeader("GET","/api/list-games",nonce);
    try{
        const gpuData = await fetch(`${API_URL}list-games`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Accept' : 'application/json',
                'nonce' : nonce,
                'authorization' : authorization,
                'X-Api-Key' : API_KEY
            }
        })
        .then(res=>res.json());
        return gpuData;
    }
    catch(e){
        console.log(e);
        return [];
    }
}

const getRecalculatePerformance = async(estimator) => {
    let nonce = Math.round((new Date()).getTime() / 1000);
    let authorization = getAuthHeader("POST","/api/estimate",nonce);
    let estimat = estimator;
    try{
        const performance = await fetch(`${API_URL}estimate`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept' : 'application/json',
                'nonce' : nonce,
                'authorization' : authorization,
                'X-Api-Key' : API_KEY
            },
            body : JSON.stringify({
                'cpuName' : estimat.cpuName,
                'gpuName' : estimat.gpuName,
                'cpuOC' : estimat.cpuOC,
                'gpuNumber' : estimat.gpuNumber,
                'gpuType' : estimat.gpuType,
                'memchannels' : estimat.memchannels,
                'memfrequency' : estimat.memfrequency
            })
        })
        .then(res=>res.json());

        return performance;
    }
    catch(e){
        console.log(e);
        return [];
    }
}

module.exports = {
    getPcGameData,
    getGameData,
    getLaptopGameData,
    getGPUList,
    getCPUList,
    getGameList,
    getRecalculatePerformance
}