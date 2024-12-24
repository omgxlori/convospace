const { Thought, User } = require('../models');

// ✅ Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    console.log('Fetched Thoughts:', JSON.stringify(thoughts, null, 2)); // Log fetched data
    res.status(200).json(thoughts);
  } catch (err) {
    console.error('Error fetching thoughts:', err);
    res.status(500).json(err);
  }
};

// ✅ Get a thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (err) {
    console.error('Error fetching thought by ID:', err);
    res.status(500).json(err);
  }
};

// ✅ Create a new thought
const createThought = async (req, res) => {
  try {
    const { username, thoughtText } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Cannot create thought.' });
    }

    const thought = await Thought.create({ thoughtText, username });
    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Update a thought
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Delete a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.status(200).json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Add a reaction
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    const { reactionBody, username } = req.body;
    if (!reactionBody || reactionBody.length > 280) {
      return res.status(400).json({ message: 'Invalid reaction body. Max length is 280 characters.' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Username is required for the reaction.' });
    }

    thought.reactions.push(req.body);
    await thought.save();

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Remove a reaction
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ Add a Thought for a Specific User
const addThoughtToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { thoughtText } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Cannot create thought.' });
    }

    const thought = await Thought.create({
      thoughtText,
      username: user.username,
    });

    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json({
      message: 'Thought added successfully to user!',
      thought,
      user: user.username,
    });
  } catch (err) {
    console.error('Error adding thought to user:', err);
    res.status(500).json({
      message: 'Failed to add thought to user.',
      error: err.message,
    });
  }
};

// ✅ Export all controllers
module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  addThoughtToUser,
};
