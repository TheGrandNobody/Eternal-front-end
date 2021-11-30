const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGageSchema = new Schema(
  {
    amount: {
      type: String,
      required: 'Id is required !',
    },
    gageId: {
      type: String,
      required: 'Gage Id is required !',
      unique: true,
    },
    gageAddress: {
      type: String,
      default: null,
      unique: true,
    },
    gageType: {
      type: String,
      default: null,
      required: 'Gage Type is required !',
    },
    riskType: {
      type: String,
      required: 'Token Id is required !',
    },
    riskPercentage: {
      type: String,
      required: 'Category is required !',
    },
    ownedByAddress: {
      type: String,
      max: 500,
      required: 'onBuyAddress is required!',
    },
    gageStatus: {
      type: String,
      default: 'pending',
    },
    gageTotalUsers: {
      type: Number,
      default: 6,
    },
    gageUsersJoined: {
      type: Number,
      default: 0,
    },

    gageJoinedUsersAddresses: {
      type: Array,
      default: [],
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'UserGages',
  }
);

module.exports = mongoose.model('UserGages', UserGageSchema);
