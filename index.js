 

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors' 
import {MongoClient, ServerApiVersion} from 'mongodb'
import objectsRouter from './routes/objectsRouter.js'

const uri = "mongodb+srv://OLM1234:OLM1234@cluster0.u4ue6dx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let objCollection;

const port = process.env.PORT || 4000

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true}))
console.log('hey')
// app.use('/api/seed',seedRouter)
app.use('/api/objects',objectsRouter)

app.listen(port,()=>console.log(`listning on por ${port}`))




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("OLMDB");

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
     objCollection = client.db("OLMDB").collection("Objects");
    const res = await objCollection.find({}).toArray();
   // console.log(res);
  } 
  catch(err){
    console.log(err)

  }
  finally {
    // Ensures that the client will close when you finish/error
 // await client.close();
  console.log("seemek")
  }
}
run().catch(console.dir);

export{objCollection,client};



