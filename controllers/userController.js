const { User, Thought } = require('../models');

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
        .populate('thoughts') // Populate the thoughts array
        .populate('friends'); // Populate the friends array
  
      console.log('Fetched users:', JSON.stringify(users, null, 2)); // Debug log
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err); // Log errors
      res.status(500).json(err);
    }
  };
  

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts') // Populate thoughts
      .populate('friends'); // Populate friends

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Fetched User:', JSON.stringify(user, null, 2)); // Debug log
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json(err);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json(err);
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json(err);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove all thoughts associated with this user
    await Thought.deleteMany({ username: user.username });

    res.status(200).json({ message: 'User and their thoughts deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json(err);
  }
};

// Add a friend to the user's friends array
const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Add friend to user's friends array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    // Add user to friend's friends array (reciprocal relationship)
    await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(500).json(err);
  }
};

// Remove a friend from the user's friends array
const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Remove friend from user's friends array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    // Remove user from friend's friends array (reciprocal relationship)
    await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
