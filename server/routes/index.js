const express = require('express')
const router = express.Router()

const Interview = require("../models/Interview.js");
const User = require('../models/User.js');


const getISODatesForFromAndTo = (date) => {
  const day = 60 * 60 * 24 * 1000;
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime() + day);
  const from = startDate.toISOString();
  const to = endDate.toISOString();
  return { from, to };
}

/*
    Routes for users
*/

// get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().populate('interviews');
    return res.json(users);
  } catch (error) {
    next(error);
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const user = {
      name : "user5",
      email : "user5@gmail.com"
    }
    const newUser = await new User(user)
    await newUser.save()
    return res.json({newUser})
  } catch (error) {
    next(error);
  }
})

// get all interviews schduled for the user on current day
router.get('/users/:id/:date', async (req, res, next) => {
  try {
    const id = req.params.id;
    const date = req.params.date;
    const { from, to } = getISODatesForFromAndTo(date);
    const interviews = await User.findOne({ _id: id }, {interviews: 1, _id: 0}).populate({
      path: 'interviews',
      match: { startTime: {$gte: from, $lt: to}}
    });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
})

// delete all interviews
router.get('/deleteInterview', async (req, res, next) => {
  try {
    const resp = await Interview.deleteMany({})
    return res.json(resp)
  } catch (error) {
    next(error);
  }
})

/*
    Routes for interviews
*/

// get all interviews
router.get('/', async (req, res, next) => {
  try {
    const interviews = await Interview.find().populate('participants');
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
})

// get all interviews on a particular day
router.post('/', async (req, res, next) => {
  try {
    const { date } = req.body;
    const { from, to } = getISODatesForFromAndTo(date);
    const interviews = await Interview.find({ startTime: { $gt: from, $lt: to } }).populate('participants');
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
});

// schedule an interview
router.post('/create', async (req, res, next) => {
  try {
    const { name, startTime, endTime, participants, description } = req.body.formData;
    const newInterview = new Interview({ name, startTime, endTime, participants, description });
    await newInterview.save();
    await User.updateMany({ _id: { $in: participants } }, { $push: { interviews: newInterview._id } });
    console.log(newInterview)
    return res.json(newInterview);

  } catch (error) {
    console.log(error);
    next(error);
  }
})

// update scheduled interview
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, startTime, endTime, participants, description } = req.body.formData;
    await Interview.updateOne({ _id: id }, { name, startTime, endTime, participants, description })
  } catch (error) {
    next(error)
  }
})

// delete scheduled interview
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const participants = await Interview.find({ _id: id }, { "participants": 1, "_id": 0 });
    await Interview.deleteOne({ _id: id });
    await User.updateMany({ _id: { $in: participants } }, { $pop: { interviews: newInterview._id } })
  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router