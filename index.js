const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');
const User = require('./model/User');
const cors=require('cors');

app.use(bodyParser.json());
require('./db/db')
const corsOptions = {
    origin: 'http://192.168.233.1:5000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
app.use(cors(corsOptions))
app.get('/', () => {
    console.log("Server is running")
})
app.post('/signup', async (req, resp) => {
    const { email, password, conpassword } = req.body;
    if (!email || !password || !conpassword) {
        return resp.status(401).send({ message: "Please provide all the details" })
    } else {
       const user= new User ({email,password,conpassword})
       await user.save()
       resp.send(user)
    }


})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

   

    try {
       
        const user = await User.findOne({ email })
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running", `${process.env.PORT}`)
})