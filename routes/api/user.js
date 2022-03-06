const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

//bassically used for register the contact
//and store the information in db
router.post('/',
[ auth,
  [
    body('name', 'Name is required').not().isEmpty(),
    body('phone_no', 'Please enter a phone_no').isLength({ min: 9 })
  ]
],
async (req,res) => {
    //validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const { name, phone_no} = req.body;

    try{
        let user = await User.findOne({ phone_no });

        if(user){
            return res.status(400).json({ errors: [{ msg: 'Contact already exists'}]});
        }

        //creating a json object for the contact
        user = new User({
            name,
            phone_no
        });

        await user.save();

        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//bassically used for register the bulk contact
//and store the information in db
router.post('/addBulkContact',auth,
async (req,res) => {
    try{
      for(var i=0;i<req.body.length;i++){

        const { name, phone_no } = req.body[i];
          let user = await User.findOne({ phone_no });

          if(user){
              return res.status(400).json({ errors: [{ msg: 'Contact already exists'}]});
          }

          //creating a json object for the contact
          user = new User({
              name,
              phone_no
          });

          await user.save();
      }
        res.json({ msg: "Contacts Added" });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route used for getting the particular contact
router.get('/:id', auth, async (req,res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    res.json(user);
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used for getting all the contacts by phase matching
router.post('/phase/match',
[ auth,
  [
    body('name', 'Name is required').not().isEmpty()
  ]
],
 async (req,res) => {
  try {
    var query = { name: req.body.name };
    const user = await User.find(query);

    res.json(user);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting all the contacts by pagination
router.get('/pagination/user',auth,
 async (req,res) => {
  try {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if(pageNo < 0 || pageNo === 0) {
        return res.status(400).json({ errors: [{ msg: 'Page Number should be more than 0'}]});
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;
    const user = await User.find({}, {}, query);

    res.json(user);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//updates the information of contact
//and store the information in db
router.post('/update/:id',
[ auth,
  [
    body('name', 'Name is required').not().isEmpty(),
    body('phone_no', 'Please enter a phone_no').isLength({ min: 9 })
  ]
],
async (req,res) => {
    //validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const { name, phone_no } = req.body;

    try{
        let user = await User.findByIdAndUpdate(req.params.id, { $set: { name: name , phone_no: phone_no }});

        res.json({ msg: "Contact Updated" });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route used delete a contact
router.delete('/delete/:id', auth, async (req,res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    await user.remove();

    res.json({ msg: 'Contact removed' });
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
