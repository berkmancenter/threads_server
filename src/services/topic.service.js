const { Topic } = require('../models');

/**
 * Create a topic
 * @param {Object} topicBody
 * @returns {Promise<Topic>}
 */
const createTopic = async (topicBody, user) => {
  const topic = await Topic.create({
    name: topicBody.name,
    owner: user,
  });
  return topic;
};

const userTopics = async (user) => {
  const topics = await Topic.find({ owner: user }).select('name slug').exec();
  return topics;
};

const findById = async (id) => {
  const topic = await Topic.findOne({ _id: id }).select('name slug').exec();
  return topic;
};

const allPublic = async () => {
  const topics = await Topic.find().select('name slug').exec();
  return topics;
};

module.exports = {
  createTopic,
  userTopics,
  findById,
  allPublic,
};
