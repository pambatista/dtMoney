import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createServer, Model } from 'miragejs'

createServer({
    models:{
        transaction: Model,
    },
    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'freelance de website',
                    type: 'deposit',
                    category: 'Dev',
                    amount: 1500,
                    createdAt: new Date('2021-02-02 09:00:00')
                },
                {
                    id: 2,
                    title: 'Trabalho',
                    type: 'deposit',
                    category: 'salario',
                    amount: 5500,
                    createdAt: new Date('2021-02-04 09:00:00')
                },
                {
                    id: 3,
                    title: 'compras',
                    type: 'withdraw',
                    category: 'compras',
                    amount: 1500,
                    createdAt: new Date('2021-02-03 09:00:00')
                }
            ]
        })
    },
    routes() {
        this.namespace = 'api'
        this.get("/transactions", () => {
            return this.schema.all('transaction')
        })

        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody)

            return schema.create('transaction', data)
        })
    },
})

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
