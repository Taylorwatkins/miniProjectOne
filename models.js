"use strict";


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

let Schema = mongoose.Schema;
let project = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
});
// Project model
const Project = mongoose.model("Project", {
  title: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contribution: [project],
  catergory: {
    type: String,
    required: true,
    enum: ['Famous Muppet Frogs', 'The Pen Is Mightier', 'Famous Mothers',
    'Drummers Named Ringo', '1-Letter Words', 'Months That Start With "Feb"',
    'How Many Fingers Am I Holding Up', 'Potent Potables']
  }
});


module.exports = {
  Project
};
