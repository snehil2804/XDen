# XDen

## About the Name
The name "XDen" signifies the versatility of the application. The "X" represents the flexibility to replace it with any content or concept, while "Den" symbolizes a home or hub for that content.And also just for fun try clicking on the logo of the site {spoiler: the value of X will change}


## Tech Stack

- Frontend: EJS (Embedded JavaScript), Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Passport.js
- Other Dependencies: Axios (for making HTTP requests)
  
## Overview
XDen is a web application inspired by Pinterest, allowing users to upload, like, and bookmark posts. It utilizes Node.js and Express for the backend, MongoDB for database storage, and EJS for the frontend. Tailwind CSS is used for styling.

Users can sign up and log in using Passport.js for authentication. Once logged in, users are directed to their profile page where they can upload a profile picture and access various features such as managing uploaded posts, viewing liked posts, and accessing saved posts.

The feed page displays posts uploaded by different users. Users can search for posts based on tags using the tag-based search feature implemented with JavaScript's filter function.

You can clone this repo in your system and use the following command to run the project or you can just [Visit the site here](https://xden.onrender.com) which is hosted on a free platform [Render](render.com)

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Site Link](#site-link)  
5. [Contributing](#contributing)
   

## Installation
To run this project locally, follow these steps:

1. Clone the repository to your local machine:`git clone`
2. Navigate to the project directory:`cd`
3. Install dependencies:`npm install`
4. Set up a MongoDB database and configure the connection in `app.js`.

5. Start the server:`npm start`
   6. Open your web browser and go to `http://localhost:3000` to access the application.

## Usage
Once the application is running, users can sign up or log in to access their profile. From the profile page, users can upload a profile picture, manage their uploaded posts, view liked posts, and access saved posts.

On the feed page, users can browse through posts uploaded by other users. They can also use the tag-based search feature to find posts related to specific tags.

## Features

- **User Authentication**: Users can create accounts and log in securely using Passport.js for authentication.
- **Profile Management**: Users can set their profile picture and view their uploaded posts, liked posts, and saved posts.
- **Post Interaction**: Users can upload new posts, like posts, and bookmark posts for later viewing.
- **Tag-based Search**: Users can search for posts based on tags using a search bar.
- **Dynamic Content**: Posts are dynamically loaded and displayed on the feed based on user interactions.
- 
## Site Link
Visit [XDen](https://xden.onrender.com) to explore the application.


## Contributing
Contributions to this project are welcome! To contribute, please follow these steps:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and test them thoroughly.
- Commit your changes and push them to your fork.
- Submit a pull request with a clear description of your changes.
