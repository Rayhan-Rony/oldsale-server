const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// name:oldphone
// p:jobE1gxgSgFwRC45

app.get('/', (req, res) => {
    res.send('Achi Vai')
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t1ebet1.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const catergoriesCollection = client.db('OldPhone').collection('Categories')
        const productsCollection = client.db('OldPhone').collection('Products')
        const usersCollection = client.db('OldPhone').collection('Users')
        const advertiseCollection = client.db('OldPhone').collection('Advertise')


        app.get('/categories', async (req, res) => {
            const query = {}
            const categories = await catergoriesCollection.find(query).toArray()
            res.send(categories)
        })
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id
            const query = { category_id: (id) }
            const products = await productsCollection.find(query).toArray()

            res.send(products)
        })
        app.post('/products', async (req, res) => {
            const product = req.body
            const result = await productsCollection.insertOne(product)
            res.send(result)
        })
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id

            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    soldStatus: 'sold'
                }
            }
            const result = await productsCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })
        app.get('/myProducts', async (req, res) => {
            const email = req.query.email

            const query = { sellerEmail: email }

            const products = await productsCollection.find(query).toArray()
            res.send(products)
        })
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const email = req.query.email
            const query = { email: email }

            const user = await usersCollection.find(query).toArray()
            res.send(user)
        })
        app.post('/advertise', async (req, res) => {
            const item = req.body
            const result = await advertiseCollection.insertOne(item)
            res.send(result)
        })
        app.get('/advertiseProducts', async (req, res) => {
            const query = {}
            const products = await advertiseCollection.find(query).toArray()
            res.send(products)
        })
        app.delete('/advertise/:id', async (req, res) => {
            const id = req.params.id
            const query = { id: id }
            const result = await advertiseCollection.deleteOne(query)
            res.send(result)
        })
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.deleteOne(query)
            res.send(result)
        })
        app.get('/sellers', async (req, res) => {
            const query = { role: "seller" }
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/user', async (req, res) => {
            const query = { role: "user" }
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.error)




app.listen(port, () => {
    console.log('Running')
})