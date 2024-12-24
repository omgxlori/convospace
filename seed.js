const mongoose = require('mongoose');
const { User, Thought } = require('./models');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: 'Just deployed my first Node.js app!',
        username: 'tech_guru',
        reactions: [
          {
            reactionBody: 'Awesome work!',
            username: 'code_master',
          },
        ],
      },
      {
        thoughtText: 'Debugging is like solving a mystery!',
        username: 'code_master',
        reactions: [
          {
            reactionBody: 'So true!',
            username: 'tech_guru',
          },
        ],
      },
      {
        thoughtText: 'NoSQL is the future!',
        username: 'data_dreamer',
        reactions: [
          {
            reactionBody: 'I love NoSQL too!',
            username: 'code_master',
          },
        ],
      },
    ]);

    // Create users and link thoughts
    const users = await User.insertMany([
      {
        username: 'tech_guru',
        email: 'techguru@example.com',
        thoughts: [thoughts[0]._id], // Link thought by _id
        friends: [],
      },
      {
        username: 'code_master',
        email: 'codemaster@example.com',
        thoughts: [thoughts[1]._id],
        friends: [],
      },
      {
        username: 'data_dreamer',
        email: 'datadreamer@example.com',
        thoughts: [thoughts[2]._id],
        friends: [],
      },
    ]);

    // Add friends (bi-directional)
    await User.findOneAndUpdate(
      { username: 'tech_guru' },
      { $addToSet: { friends: users[1]._id, friends: users[2]._id } }
    );
    await User.findOneAndUpdate(
      { username: 'code_master' },
      { $addToSet: { friends: users[0]._id } }
    );

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seedData();
