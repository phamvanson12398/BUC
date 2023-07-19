
 

const getuserApi = (req,res)=>{
    
    console.log("phamvanson");
    return res.status(200).json({
        data:"phamvanson"
    })
    
}


export default {
    getuserApi
}