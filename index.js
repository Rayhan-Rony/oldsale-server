const express = require('express');
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// name:oldphone
// p:jobE1gxgSgFwRC45

app.get('/', (req, res) => {
    res.send('Achi Vai')
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://oldphone:jobE1gxgSgFwRC45@cluster0.t1ebet1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
async function run() {
    try {
        const catergoriesCollection = client.db('OldPhone').collection('Categories')
        const productsCollection = client.db('OldPhone').collection('Products')
        const usersCollection = client.db('OldPhone').collection('Users')


        app.get('/categories', async (req, res) => {
            const query = {}
            const categories = await catergoriesCollection.find(query).toArray()
            res.send(categories)
        })
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id
            const query = { category_id: (id) }
            const products = await productsCollection.find(query).toArray()
            // console.log(id)
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
            // console.log(email)
            const user = await usersCollection.find(query).toArray()
            res.send(user)
        })
    }
    finally {

    }
}
run().catch(console.error)




app.listen(port, () => {
    console.log('Ho Ho Amio')
})