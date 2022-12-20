const config = {
    user:'eveteyrp_dbuser',
    password: 'N6xY47Mf',
    server:'156.38.160.2',
    database:'eveteyrp_evetech',
    requestTimeout: 130000,
    options:{
        trustServerCertificate:true,
        trustConnection:false,
        enableArithAbort:true,
        instancename:'',
        idleTimeoutMillis: 130000,
    },
    port:1433
};

module.exports = config;