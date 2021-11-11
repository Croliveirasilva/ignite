const { request, response } = require("express");
const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const customers=[];

/// Middleware
function verifyExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;

    const custormer= customers.find((customer)=>customer.cpf === cpf);

    if(!custormer){
        return response.status(400).json({error:"Usuario não existe"})
    }

    request.customer = custormer;
    return next();

}

//Realizando a criação de uma conta 
app.post("/account",(request,response)=>{
const {cpf, name}=request.body;

const customerAlreadyExists =customers.some(
    (custormer)=> customerAlreadyExists.cpf === cpf
);
if (customerAlreadyExists){
    return response.status(400).json({error:"Usuario já existe"});
}

customers.push({
    cpf,
    name,
    id:uuidv4(),
    statement:[],
    });
    return response.status(201).send();
});

//Realizando busca por extrato

app.get("/statement",verifyExistsAccountCPF ,(request,response)=>{
   const {customer}=request;

   return response.json(custormer.statement);
   
    });

app.listen(3333);