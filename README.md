# BookStack Pro 📚

A modern, full-stack MERN application to manage your personal book collection. Add books with cover images and view your library in a clean, responsive interface.

**Live Demo:** `https://book-management-r8v4.onrender.com`

---

## **Features**

- Add new books with a title, author, and cover image.
- View and search your entire book collection in real-time.
- Image uploads are handled by Cloudinary for fast performance.
- Includes UI feedback like toast notifications and an upload progress bar.

---

## **Tech Stack**

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Deployment:** Render

---

## **Run Locally**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/prathikakulal/Book_Management_App.git](https://github.com/prathikakulal/Book_Management_App.git)
    cd Book_Management_App
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in this folder and add your `MONGO_URI` and `CLOUDINARY` keys.

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in this folder and add `VITE_API_URL="http://localhost:5001"`.

4.  **Start the servers:**
    - In one terminal, run the backend: `cd backend && npm start`
    - In a second terminal, run the frontend: `cd frontend && npm run dev`
