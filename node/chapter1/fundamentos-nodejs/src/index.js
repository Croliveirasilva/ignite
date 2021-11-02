const express = require('express');


const app = express();

app.get("/", (request, response) => {
    return response.json({message:"hello world Ignite!"});
});

//
app.listen(3333);