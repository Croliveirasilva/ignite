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

/// outras funções

function getBalance(statement){
  const balance =  statement.reduce((acc,operation)=>{
        if(operation.type==='credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    },0);

    return balance;
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

// Realiza um deposito
app.post("/deposit",verifyExistsAccountCPF ,(request,response)=>{
    const {description, amount}=request.body;
    const {customer}= request;

    const statementOperation ={
        description,
        amount,
        created_at:new Date(),
        type:"credit",
    }

    customer.statement.push(statementOperation);
 
    return response.status(201).send();
     
     });

///Realiza um saque
app.post("/withdraw",verifyExistsAccountCPF ,(request,response)=>{
    const {amount}=request.body;
    const {customer}= request;

    const balance = getBalance(customer.statement);

    if(balance<amount){
        return response.status(400).json({error:"Fundos insuficiente"});
    }
     
    const statementOperation ={
        
        amount,
        created_at:new Date(),
        type:"debit",
    }

    customer.statement.push(statementOperation);
 
    return response.status(201).send();
     
     }); 

///Realiza uma pesquisa de saldo por data
app.get("/statement/date",verifyExistsAccountCPF ,(request,response)=>{
    const {customer}=request;
    const{date} = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement)=>statement.created_at.toDateString()=== new Date
    (dateFormat).toDateString()
    );
 
    return response.json(statement);
 
     });

///Realiza atualização da conta     
app.put("/account",verifyExistsAccountCPF ,(request,response)=>{
    const {customer}=request;
    const{name} = request.body;

    customer.name = name;
 
    return response.status(201).send();
 
     });

     ///Realiza busca da conta    
app.get("/account",verifyExistsAccountCPF ,(request,response)=>{
   const {customer}=request;
  

   return response.json(customer);

    });

     ///Realiza a exclusão do usuario
app.delete("/account",verifyExistsAccountCPF ,(request,response)=>{
    const {customer}=request;
   customer.splice(customer, 1);
 
    return response.status(200).json(customer);
  
     });
     
     /// Realiza busca do saldo
app.get("/account",verifyExistsAccountCPF ,(request,response)=>{
   const {customer}=request;
   const balance=getBalance(customer.statement);
   return response.json(balance);
    });     
     
app.listen(3333);