// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../utilities/mongo"
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const { method, query:{id}, cookies } = req;

    const token = cookies.token

    dbConnect()

    if(method === "GET"){
        try{
            const product = await Product.findById(id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method === "PUT"){
        if(!token || token!== process.env.TOKEN){
            return res.status(401).json("You are not allowed to do that!")
        }
        try{
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method === "DELETE"){
        if(!token || token!== process.env.TOKEN){
            return res.status(401).json("You are not allowed to do that!")
        }
        try{
            await Product.findByIdAndDelete(id)
            res.status(200).json("product deleted")
        }catch(err){
            res.status(500).json(err)
        }
    }
  }
  