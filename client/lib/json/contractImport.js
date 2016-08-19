//compiled with 0.3.6-2016-08-12

//update after any contract changes
contractJsonDB = [{"constant":true,"inputs":[{"name":"_i","type":"uint256"}],"name":"showTimestamps","outputs":[{"name":"timestampOwner","type":"address"},{"name":"blockTime","type":"uint256"},{"name":"oracleTime","type":"uint256"},{"name":"oracleURL","type":"string"},{"name":"proof","type":"bytes"},{"name":"storedValue","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_cbStorage","type":"bytes32"},{"name":"_timeOwner","type":"address"},{"name":"_blockTime","type":"uint256"},{"name":"_storage","type":"string"}],"name":"addBlockTimestamp","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"callbackStorage","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_cbStorage","type":"bytes32"},{"name":"_oracleTime","type":"uint256"},{"name":"_oracleURL","type":"string"},{"name":"_proof","type":"bytes"}],"name":"addOracleTimestamp","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getLastCallback","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"getCallbackLength","outputs":[{"name":"","type":"uint256"}],"type":"function"}]

contractJsonLogic = [{"constant":false,"inputs":[{"name":"_data","type":"string"},{"name":"_type","type":"string"},{"name":"_url","type":"string"},{"name":"_proof","type":"bool"}],"name":"getTimeCustom","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"}],"name":"__callback","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"string"}],"name":"updateOracle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"},{"name":"_proof","type":"bytes"}],"name":"__callback","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"oracleURL","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_m","type":"uint8"}],"name":"changeMultiplier","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_url","type":"string"},{"name":"_r","type":"uint8"},{"name":"_m","type":"uint8"},{"name":"_c","type":"string"},{"name":"_g","type":"uint256"}],"name":"updateAll","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_r","type":"uint8"},{"name":"_m","type":"uint8"},{"name":"_g","type":"uint256"}],"name":"updateCosts","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_m","type":"uint8"}],"name":"changeMultiplierNoUpdate","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"string"}],"name":"getBlockTimeOnly","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"tipCreator","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_r","type":"uint8"}],"name":"changeRounding","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"string"}],"name":"getTime","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_proof","type":"bool"},{"name":"_type","type":"string"}],"name":"getCustomPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"showPrices","outputs":[{"name":"basicPrice","type":"uint256"},{"name":"proofPrice","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_g","type":"uint256"}],"name":"updateGas","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"showDatabaseAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":false,"name":"timeOwner","type":"address"},{"indexed":false,"name":"blockTime","type":"uint256"},{"indexed":false,"name":"storedValue","type":"string"}],"name":"LogBlockTimestamped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":false,"name":"timeOwner","type":"address"},{"indexed":false,"name":"oracleTime","type":"uint256"},{"indexed":false,"name":"oracleURL","type":"string"},{"indexed":false,"name":"proof","type":"bytes"}],"name":"LogOracleTimestamped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"price","type":"uint256"}],"name":"LogCustomPriceAnnounce","type":"event"}]

contractJsonResolver = [{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"lockUpdates","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getDBAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"getLogicAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_DBAddr","type":"address"}],"name":"setDBAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"unlockUpdates","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_logicAddr","type":"address"}],"name":"setLogicAddress","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"logic","type":"address"},{"indexed":false,"name":"creator","type":"address"}],"name":"LogUpdatedLogic","type":"event"}]

contractJsonLogicUser = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_data",
                "type": "string"
            }
        ],
        "name": "getTime",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_data",
                "type": "string"
            }
        ],
        "name": "getBlockTimeOnly",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_data",
                "type": "string"
            },
            {
                "name": "_type",
                "type": "string"
            },
            {
                "name": "_url",
                "type": "string"
            },
            {
                "name": "_proof",
                "type": "bool"
            }
        ],
        "name": "getTimeCustom",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "oracleURL",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "tipCreator",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_proof",
                "type": "bool"
            },
            {
                "name": "_type",
                "type": "string"
            }
        ],
        "name": "getCustomPrice",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showPrices",
        "outputs": [
            {
                "name": "basicPrice",
                "type": "uint256"
            },
            {
                "name": "proofPrice",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showDatabaseAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [],
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "timeOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "blockTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "storedValue",
                "type": "string"
            }
        ],
        "name": "LogBlockTimestamped",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "timeOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "oracleTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "oracleURL",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "proof",
                "type": "bytes"
            }
        ],
        "name": "LogOracleTimestamped",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "LogCustomPriceAnnounce",
        "type": "event"
    }
]