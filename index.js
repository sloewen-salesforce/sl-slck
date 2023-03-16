const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const request = require("request");

const PORT = process.env.PORT || 5000
const app = express();
  
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
  
app.listen(PORT, () => console.log("Server started on port ${ PORT }") );

app.post("/product", (req, res) => {
    const response_url = req.body.response_url;
    const command = req.body.command;
    const text = req.body.text;
    console.log("response_url: "+response_url);

    // Tell Slack that I am working on it...
    res.send("*Looking up Product #* _"+text+"_");

    // Call ERP to get details on the product...
    //...

    // Returning the product details with dummy data...
    request( { 
        url: response_url,
        method: "POST",
        json: true,
        headers: { "content-type": "application/json" },
        body: 
            { blocks: [ 
                { type: "section", 
                    text: { 
                        type: "mrkdwn", 
                        text: "*Product #* _"+text+"_"
                    } 
                },
                { type: "section", 
                    text: { 
                        type: "mrkdwn", 
                        text: "*Quantity on-hand:* _43_"
                    } 
                } 
            ] }
    }, function(error, response, body) { 
        if (error)
            console.log(error);
        else 
            console.log(response.body); 
    });

}
)
