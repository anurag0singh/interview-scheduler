const express = require('express');
const router = express.Router()

const Interview = require("../models/Interview.js");
const User = require('../models/User.js');

const getISODatesForFromAndTo = (date) => {
  const day = 60 * 60 * 24 * 1000;
  const startDate = new Date(date + " " + "00:00");
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

// api to create users
router.post('/create/user', async (req, res, next) => {
  try {
    const resp = []
    for (let idx = 0; idx < 20; idx++) {
      const user = {
        name: `user${idx}`,
        email: `user${idx}@gmail.com`
      }
      const newUser = new User(user);
      await newUser.save();
      resp.push(newUser);
    }
    return res.json({ resp })
  } catch (error) {
    next(error);
  }
})

// delete all users
router.delete('/deleteUsers', async (req, res, next) => {
  try {
    const resp = await User.deleteMany({});
    return res.json(resp);
  } catch (error) {
    next(error);
  }
})

/*
    Routes for interviews
*/

// get all interviews schduled for the user on current day and time slot
router.post('/conflicts', async (req, res, next) => {
  try {
    const { ids, from, to } = req.body;
    const interviews = await User.find({ _id: { $in: ids } }, { interviews: 1, _id: 0 }).populate({
      path: 'interviews',
      match: { $or:[
        {startTime: { $gte: from, $lte: to }},
        {endTime: { $gte: from, $lte: to}}
      ] }
    });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
})

// get all interviews schduled for the user except one meeting
router.post('/conflicts/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { ids, from, to } = req.body;
    const interviews = await User.findOne({ _id: { $in: ids } }, { interviews: 1, _id: 0 }).populate({
      path: 'interviews',
      match: {
        $and: [
          { startTime: { $gte: from, $lt: to } },
          { _id: { $ne: id } }
        ]
      }
    });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
})

// delete all interviews
router.delete('/deleteInterviews', async (req, res, next) => {
  try {
    const resp = await Interview.deleteMany({})
    return res.json(resp)
  } catch (error) {
    next(error);
  }
})

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
    return res.json(newInterview);

  } catch (error) {
    next(error);
  }
})

// update scheduled interview
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, startTime, endTime, participants, description } = req.body.formData;
    const resp = await Interview.updateOne({ _id: id }, { name, startTime, endTime, participants, description })
    await User.updateMany({$and: [{_id : {$nin: participants}}, {interviews: {$not: {$size: 0}}}]}, {$pull : {interviews: id}});
    return res.json(resp);
  } catch (error) {
    next(error)
  }
})

// delete scheduled interview
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const participants = await Interview.find({ _id: id }, { participants: 1, _id: 0 }).then(data => data[0].participants);
    const resp = await Interview.deleteOne({ _id: id });
    await User.updateMany({ _id: { $in: participants } }, { $pull: { interviews: id } });
    return res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
})

module.exports = router