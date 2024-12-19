# Project Setup

This project is a full-stack application split into two main folders: `frontend` and `backend`. Below are the setup instructions, along with details on what's working and what remains to be implemented.

---

## Prerequisites

Ensure you have the following installed on your system:
- Node.js (v18)
- PostgreSQL (Ensure a database instance is running and accessible)

---

## Setup Instructions

### 1. Backend Setup

#### Steps:
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file in the `backend` folder with the following variables:
     ```env
     DATABASE_URL=<your_postgres_database_url>
     GITHUB_TOKEN=<your_github_personal_access_token>
     ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The server should now be running at `http://localhost:9000`.

### 2. Frontend Setup

#### Steps:
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Access the frontend at `http://localhost:5173` (default Vite dev server URL).

---

## Features Achieved

### Frontend:
- **UI Implementation:** The application is designed using MUI, with full mobile responsiveness.
- **GraphQL Integration:** GraphQL APIs are integrated into the frontend.
- **State Management:** Loading states and unread release indicators are implemented for a better user experience.
- **Repository List:** The list of repositories is fetched from the backend and displayed on the frontend.
- **Releases List:** The list of releases for a repository are fetched from the backend and displayed on the frontend.
- **Manual Refresh:** The user can manually refresh the list of repositories and releases.

### Backend:
- **GraphQL & PostgreSQL Integration:** The backend uses Apollo Server with PostgreSQL via Sequelize ORM.
- **Queries and Mutations:** GraphQL queries and mutations have been implemented to interact with the database.
- **GitHub API Integration:** The backend utilizes Octokit to fetch data from GitHub APIs.
- **Database Management:** The backend manages the database using Sequelize ORM.
- **Syncing the Database:** The backend syncs the database with GitHub repositories and releases when tracked.

---

## Pending Tasks (If given more time)

- **Error Handling:** Implement a better error-handling mechanism in the UI for better user feedback. I would integrate error toaster for better error handling
- **Auto Polling:** Implement periodic polling to fetch the latest releases from GitHub automatically. Use cron in the backend for auto polling and getting the release details. Also implement websocket in the FE to get real-time updates.
- **Additional Release Details:** Fetch and display release-specific details such as commit information.
- **Repository Management:** Add filtering and sorting functionality for repositories.

---

## Notes

- Ensure both the frontend and backend servers are running simultaneously for the application to work as expected.
- If you encounter issues with database connectivity, double-check your `DATABASE_URL` in the `.env` file.


## Future Improvements
1. We can add authentication and authorization in the backend.
2. Implement better error handling for both backend and frontend.
3. Enhance the UI/UX of the frontend application.
4. Add testing for both frontend and backend.
5. Optimize database queries and API calls.