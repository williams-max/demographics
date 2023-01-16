const express = require("express");
const router = express.Router();
const fs = require('fs');
const axios = require('axios')
//const { translate } = require('free-translate');

'use strict';


function routes(app) {

    router.get('/', async (req, res) => {
        res.send("work!!!");
    });


    router.get('/get-product', async (req, res) => {
        try {

            const result = await axios.post(`https://gestionaleideale.cloud/rest/api/v1/auth`, {
                "client": "dashboard.gestionaleideale",
                "user": "demo-dashboard",
                "api_key": "ff90790787f8572cc1933ac6b5789fdea8411a34ba189e9734f934f7f7a509b7"
            })
            var token = result.data.token;
            const resProd = await axios.get(`https://gestionaleideale.cloud/rest/api/v1/demo-easydashboard/products`,
                {
                    headers: {
                        'Authorization': `token: ${token}`
                    }
                }

            )
          
            res.send(resProd.data);
        } catch (error) {

            console.log(error)

            res.send("error");
        }
     


    });


    return router;
};

module.exports = routes;
