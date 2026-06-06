const Imagekit=require('@imagekit/nodejs')
const imagekit=new Imagekit({
    privateKey:process.env.imagekitkey
})
async function createurl(Buffer){
    const res=await imagekit.files.upload({
        file:Buffer.toString('base64'),
        fileName:"resumepdf"
    })
    return res
}
module.exports=createurl