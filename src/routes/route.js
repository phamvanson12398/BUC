import express from "express"
let route = express.Router();

export const initRoute = (app)=>{
    route.get('/',(req,res)=>{
        console.log('Trang Chu');
    })
    return app.use('/',route)
}