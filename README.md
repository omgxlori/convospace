# ConvoSpace

ConvoSpace is a dynamic and interactive social network API built using MongoDB, Express.js, and Node.js. Designed to facilitate seamless connections between users, the platform allows users to share thoughts, react to others' posts, and build meaningful friendships in a digital space.

This back-end API serves as the foundation for developers to build scalable and feature-rich social networking applications.

## Table of Contents
- [Visuals](#visuals)
- [Prerequisites](#prerequisites)
- [Key Features](#key-features)
- [Installation](#installation)
- [API Endpoints Overview](#api-endpoints-overview)
- [Usage](#usage)
- [Support](#support)
- [Future Developments](#future-developments)
- [Contributing](#contributing)
- [License](#license)


## Visuals
Please follow this link for a walk-through on how to use the command-line tool: https://www.loom.com/share/0fce93b03d1247a7a88bd27652325185?sid=47120844-967a-4256-98ab-8c31728ce89a

## Prerequisites
- Node.js: Make sure you have Node.js installed (version 14 or higher is recommended).
- MongoDB (Community Edition or MongoDB Atlas for cloud-based setup)
- Insomnia or Postman (for API testing)

## Key Features
- User Management: Create, update, and delete user profiles.
- Thoughts System: Users can create, update, and delete thoughts.
- Reactions: Add reactions to specific thoughts.
- Friendship System: Add and remove friends to expand social connections.
- Real-time Data Handling: Optimized database queries ensure fast data delivery.

## Installation
1. Clone the Repository:
```md
git clone https://github.com/your-username/ConvoSpace.git
cd ConvoSpace
```
2. Install Dependencies:
```md
npm install
or
npm i
```
3. Start the Project:
```md
npm run start
```

4. Access the API through Insomnia or Postman at:
```md
http://localhost:3001/api
```

## API Endpoints Overview
**Users**
GET /api/users → Get all users.
GET /api/users/:userId → Get a single user by ID.
POST /api/users → Create a new user.
PUT /api/users/:userId → Update user details.
DELETE /api/users/:userId → Delete a user.
POST /api/users/:userId/friends/:friendId → Add a friend.
DELETE /api/users/:userId/friends/:friendId → Remove a friend.

**Thoughts**
GET /api/thoughts → Get all thoughts.
GET /api/thoughts/:thoughtId → Get a specific thought.
POST /api/thoughts/user/:userId → Create a new thought for a user.
PUT /api/thoughts/:thoughtId → Update a thought.
DELETE /api/thoughts/:thoughtId → Delete a thought.
POST /api/thoughts/:thoughtId/reactions → Add a reaction.
DELETE /api/thoughts/:thoughtId/reactions → Remove a reaction.

## Support
If you need help using this project or encounter issues, please reach out via the following options:

GitHub Issues: Report bugs or request features by opening an issue in the GitHub repository.
Email: Contact me at lbelovin@gmail.com for any inquiries.
You can also find more of my work at [https://github.com/omgxlori](https://github.com/omgxlori)

## Future Developments
Here are some ideas for future releases:

- Mobile App Integration: Develop a mobile-friendly interface or a dedicated mobile app for better accessibility.
- Multimedia Support: Allow users to share images, GIFs, and short videos within their thoughts.
- Threaded Discussions: Introduce threaded replies for more organized and engaging conversations.

## Contributing
Contributions are welcome! Here are the steps to get started:

1. Fork the repository on GitHub.
2. Create a new branch:
```md
git checkout -b feature/your-feature
```
3. Make your changes, then commit:
```md
git commit -m 'Add your feature'
```
4. Push to your branch:
```md
git push origin feature/your-feature
```
5. Create a Pull Request on GitHub.

Please make sure to add tests for new functionality and ensure your code is linted and formatted consistently.

## License
This project does not have an official license at the moment. If you have questions about using this code, please contact the author.