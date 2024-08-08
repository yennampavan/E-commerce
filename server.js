const express = require('express')
const mongoose = require('mongoose');
const Registernewuser = require('./usermodel');
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
const cors = require('cors')


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
        jwt.sign(payload,'jwtSecret',{expiresIn:6000},
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

app.listen(5000,()=>console.log('server running ....'))