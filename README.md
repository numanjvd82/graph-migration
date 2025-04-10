# Graph8 

PingCRM migration as a test

## 📂 Project Structure
```
/frontend   (React + TypeScript)
/backend    (FastAPI)
/README.md  (Includes instructions and links)
```

## 🚀 Getting Started

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
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL (Supabase)
- **Frontend:** React, TypeScript, Axios, React Query, ShadCN (UI)

## 🌐 Deployment
Deployment URLs will be updated soon.

- **Backend:** [Render/Deta] (TBA)
- **Frontend:** [Vercel] (TBA)

## ⏳ Time Spent
Approximately **5 to 5.5 hours**.

## 🔧 Known Issues
- Company filter by name is not yet implemented.

## 🤖 AI & Resources Used
- ChatGPT
- Stack Overflow
- GitHub Discussions

---
**Happy coding! 🚀**

