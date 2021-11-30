const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserApprovalStatusSchema = new Schema(
  {
    account: {
      type: String,
      required: 'account is required !',
      unique: true,
    },
    approvalStatus: {
      type: Boolean,
      required: 'approvalStatus is required !',
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'UserApprovalStatus',
  }
);

module.exports = mongoose.model('UserApprovalStatus', UserApprovalStatusSchema);
