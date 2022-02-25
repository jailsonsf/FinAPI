const express = require('express');
const res = require('express/lib/response');
const { v4: uuidV4 } = require('uuid');


const app = express();
app.use(express.json());


const customers = []
/**
 * cpf - String
 * name - String
 * id - uuid
 * statement - []
 */
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already Exists" });
    }

    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return response.status(201).send();
});

app.get('/statement/:cpf', (request, response) => {
    const { cpf } = request.params;

    const customer = customers.find((customer) => customer.cpf === cpf);

    return response.json(customer.statement);
});

app.listen(3333);