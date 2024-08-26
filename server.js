const express = require('express')
const mongoose = require('mongoose');
const Registernewuser = require('./usermodel');
const Cart = require('./cartmodel')
const Product = require('./productmodel')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');


mongoose.connect('mongodb+srv://yennampavan:yennampavan@cluster1.adjw0lh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1').then(()=>console.log("Db connected..."));

const app = express()
app.use(express.json())

app.use(cors({origin:'*'}))

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/register',async (req,res)=>{
    try{
        const {name,email,phoneNumber, password,confirmpassword} = req.body;
        let exist = await Registernewuser.findOne({email:email});
        if(exist){
            return res.status(400).send('user already rxists')
        }
        if (password!== confirmpassword){
            return res.status(400).send('password not matching')
        }
        let newUser = new Registernewuser({
            name,
            email,
            phoneNumber,
            password,
            confirmpassword
        })
        await newUser.save()
        res.status(200).send('Registered sucesssfully')

    }catch(err){
        console.log(err)
        return res.status(500).send('internal server error')
    }
})


app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        let exist = await Registernewuser.findOne({email})
        if(!exist){
            return res.status(400).send('user not found');
        }
        if (exist.password!==password){
            return res.status(400).send('invalid credentals')
        }
        let payload = {
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:360000},
            (err,token)=>{
                if (err) throw err;
                return res.json({token})
            } 
        )
    }catch(err){
        console.log(err)
    }

})

app.get('/myprofile',middleware,async (req,res)=>{
    try{

        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('user not found')
        }
        res.json(exist)
    }catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
})


// app.post('/products', async (req, res) => {
//     try {
//       // Generate unique IDs for each product
//       const products = req.body.map(product => ({
//         _id: uuidv4(), // Assign a unique ID
//         ...product
//       }));
  
//       // Insert multiple products
//       const result = await Product.insertMany(products);
//       res.status(201).json(result);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   app.get('/products', async (req, res) => {
//     try {
//       const products = await Product.find(); // Fetch all products from the collection
//       res.status(200).json(products); // Send the products in the response
//     } catch (error) {
//       res.status(500).json({ error: error.message }); // Handle any errors
//     }
//   });






app.listen(5000,()=>console.log('server running ....'))