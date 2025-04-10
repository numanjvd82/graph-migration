# Graph8 

PingCRM migration as a test

## 📂 Project Structure
```
/frontend   (React + TypeScript)
/backend    (FastAPI)
/README.md  (Includes instructions and links)
```

## Getting Started

### Backend Setup (FastAPI)

1. **Create an `.env` file** and add your Supabase PostgreSQL connection string:
   ```ini
   DATABASE_URL=your_supabase_postgres_connection_string
   ```

2. **Activate virtual environment (Python 3)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Mac/Linux
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   uvicorn src.main:app --reload
   ```

   The server will start running on **http://localhost:8000**.

### Frontend Setup (React + TypeScript)

1. **Navigate to the frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   The frontend will start running on **http://localhost:3000**.

## 🛠️ Tech Stack
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL (Supabase), Pydantic, Psycopg3 for async connection
- **Frontend:** React, TypeScript, Axios, Zod, React Hook form, React Query, ShadCN (UI)

## 🌐 Deployment
Deployment URLs

- **Backend:** [Railway](https://graph8-fastapi-production.up.railway.app)
- **Frontend:** [Netlify](https://graph8-migration.netlify.app/)


## ⏳ Time Spent
Approximately **5 to 5.5 hours**.

## Workflow
In PingCRM migration, I chose React Query with Axios for efficient data fetching and caching on the frontend. React Query helps manage server state, reduce unnecessary re-renders, and ensures data consistency by automating data fetching, updating, and caching. Coupled with Zod for schema validation, it ensures that the data passed between the frontend and backend is always in the correct format, improving reliability and reducing bugs. React Hook Form streamlines form management, making it easy to handle complex forms with minimal re-renders, providing a smooth user experience. The loading state and error states are all handled in the frontend with a graceful toast notification.

On the backend, I used psycopg3 for async database connections to improve performance. This allows non-blocking database queries, making the application more responsive, especially when dealing with high traffic. Additionally, I implemented custom exception handling to ensure that any errors during database interactions or API requests are properly caught, logged, and presented in a consistent manner, preventing unexpected crashes and improving overall stability and user experience.

## 🔧 Known Issues
- Company filter by name is not yet implemented.
- No pagination on the frontend but backend supports.

## AI & Resources Used
- ChatGPT
- Stack Overflow
- GitHub Discussions
