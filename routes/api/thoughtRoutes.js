const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  addThoughtToUser,
} = require('../../controllers/thoughtController');

// Thoughts routes
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Add Thought to Specific User
router.route('/user/:userId').post(addThoughtToUser);

// Reactions routes
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
