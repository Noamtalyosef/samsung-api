import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { objCollection } from '../index.js';
import { ObjectId } from 'mongodb';

const objectsRouter = express.Router();



objectsRouter.get("/", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in sam getAll ndpoint")
        const objects = await objCollection.find({}).toArray();
        res.send(objects)
    }
    catch(err)
    {
         console.log(err)
    }
}))


objectsRouter.get("/:_id", expressAsyncHandler(async(req,res)=>{
    try{
        console.log("in sam api getbyID")
        const id = req.params._id;
        console.log(id)
        const obj = await objCollection.findOne(  { _id: new ObjectId(id) });
        console.log(obj)
        res.send(obj)
    }
    catch(err)
    {
        res.send(err)
        console.log(err)
    }
}))


objectsRouter.get("/getSome", expressAsyncHandler(async(req,res)=>{
        try{
            console.log("in sam some  ndpoint")
            const idsArray = req.body._ids;
            const objectIdArray = idsArray.map(id => new ObjectId(id)) 
            const objects = await objCollection.find({_id:{$in: objectIdArray}}).toArray();
            console.log(objects)
            res.send(objects)
        }
        catch(err)
        {
             console.log(err)
        }
    }))


    objectsRouter.post("/create", expressAsyncHandler(async(req,res)=>{
        try{
            console.log("in create  ndpoint")
            const obj = req.body;
            console.log(obj)
            const createdObjId = await objCollection.insertOne({obj});
            console.log(createdObjId)
            res.send(createdObjId);
        }

        catch(err)
        {
             console.log(err)
        }

    }))



    objectsRouter.delete("/delete/:id", expressAsyncHandler(async(req,res)=>{
        try{
            console.log("in delete  ndpoint")
            const id = req.params.id;
            console.log(id)
            const obj = await objCollection.deleteOne({ _id: new ObjectId(id) });
            console.log(obj)
            res.send(obj)
        }
        catch(err)
        {
             console.log(err)
        }
    }))
   



export default objectsRouter;