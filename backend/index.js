const port = 4000;
const express = require("express");
const app = express();
const mongose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { AsyncResource } = require("async_hooks");

app.use(express.json());
app.use(cors());

// Database connection with mongodb

mongose.connect("mongodb+srv://jaswanthuchiha69:8096191416@cluster0.wuw75jw.mongodb.net/food")


// API creation

app.get('/',(request,response)=>{
    response.send("express is running")

})

// Image storage

const storages = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const upload = multer({storage:storages})

//Creating upload end point

app.use('/images',express.static('upload/images'))


app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`https://foodone-seven.vercel.app/images/${req.file.filename}`

    })

})

//Schema for product 

const Product = mongose.model("Product",{
   id:{
    type:Number,
    required:true,
   },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        requierd:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


app.post('/addpro',async(req,res)=>{
    let products = await Product.find({});

    let id;

    if(products.length>0){
        let last_pro = products.slice(-1);
        let last = last_pro[0];
        id = last.id+1;
    }
    else{
        id=1;
    }

    const product = new Product({

        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price,


    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })

})

// Deleting

app.post('/remove',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name,

    })

})


//for all produccts

app.get('/allpro',async(req,res)=>{
    let products = await Product.find({});
    console.log("all product feteched")
    res.send(products)
})


//Schema for user model

const Users = mongose.model('Users',{

    username:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartdata:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


//Creating register signup

app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"email already exists"});
    }
    let cart = {};
    for (let i = 0; i < 41; i++) {
        cart[i] = 0;
        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartdata:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret');
    res.json({success:true,token});
})


//login nigger

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passcomp = req.body.password === user.password;
        if(passcomp){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"Wrong Password"});
        }
        
    }
    else{
        res.json({
            success:false,
            error:"Wrong mail id"
        })
    }
})

//create fetch user

const fetchuser = async(req,res,next) => {
    const token = req.header('token');
    if(!token){
        res.status(401).send({error:"please authenticate"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({error:"please authenticate"})
        }
    }
}


//add to cart

app.post('/addtocart',fetchuser,async(req,res)=>{
    console.log("Added",req.body.itemid);

 let userdata = await Users.findOne({_id:req.user.id});
    userdata.cartdata[req.body.itemid] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata});
    res.send("added")
}
)

//create to remove

app.post('/removefrom',fetchuser,async(req,res) =>{
    console.log("removed",req.body.itemid);
    let userdata = await Users.findOne({_id:req.user.id});
    if(userdata.cartdata[req.body.itemid]>0){
    userdata.cartdata[req.body.itemid] -= 1;}
    await Users.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata});
    res.send("removed") 
})

// cart data

app.post('/getcart',fetchuser,async(req,res)=>{
    
    let userdata = await Users.findOne({_id:req.user.id});
    res.json(userdata.cartdata);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running at port " +port)
    }
    else{
        console.log("error ",+error)
    }
})