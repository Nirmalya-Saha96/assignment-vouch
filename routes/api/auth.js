const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//basically required for login

//post req to authenticate user and get token public
router.post('/',
[
    body('email', 'Please enter proper email').isEmail(),
    body('password', 'Please enter the password').exists()
],
async (req,res) => {
    //validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    //getting the email and password for verification
    const { email, password } = req.body;

    try{
        if(email === 'nirmalya.saha201@gmail.com' && password === '123456'){
          const payload = {
              user: {
                  id: email
              }
          };

          //returns the token by checking the jwt sign with the user id
          //expires in 1hr
          jwt.sign(payload,
               config.get('jwtSecret'),
               { expiresIn: 360000 },
               (err, token) => {
                   if(err) throw err;
                   res.json({ token });
               }
          );
        }
        else{
          return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
