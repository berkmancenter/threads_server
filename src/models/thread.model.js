const mongoose = require('mongoose');
const slugify = require('slugify');
const { toJSON, paginate } = require('./plugins');

const threadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      private: true,
    },
    topic: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Topic',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
threadSchema.plugin(toJSON);
threadSchema.plugin(paginate);

threadSchema.pre('validate', function (next) {
  const thread = this;
  thread.slug = slugify(thread.name);
  next();
});

/**
 * @typedef Thread
 */
const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
