# Hang App

Hang is an app that allows users to plan itineraries based on their profiles.

## Getting Started

To get started with Hang, follow the steps below:

### Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

`bash
Copy code
git clone <repository-url>`
Navigate to the project directory

bash
Copy code
cd Hang
Initialize npm:

csharp
Copy code
npm init -y
Install dependencies:

Copy code
npm install express
Configuration
Add Credentials:

Create a file named .env in the root directory of the project and add the following credentials:

makefile
Copy code
MONGODB_URI=your_mongodb_uri
YELP_API_KEY=your_yelp_api_key
Replace your_mongodb_uri with your MongoDB URI and your_yelp_api_key with your Yelp API key.

Running the App
Backend:

bash
Copy code
cd backend
node routes.js
This will start the backend server.

Frontend:

bash
Copy code
cd frontend
npm start
This will start the frontend server.

Usage
Once the backend and frontend servers are running, you can access the Hang app through your browser at http://localhost:3000.

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.
