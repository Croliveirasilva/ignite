import express from 'express';

const app = express();

app.get("/", (request, response) => {
    return response.json({ message: "Ola pessoas" });
})

app.listen(3333);