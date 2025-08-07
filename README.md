# MERN Expense Tracker

Track your expenses, manage your budget, and visualize your spending with a modern full-stack web app built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- User authentication and secure login/signup
- Add, edit, delete expenses
- Categorize transactions
- Monthly expense summary and chart visualization
- Responsive dashboard UI
- RESTful API backend

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- Tailwind CSS or Bootstrap (optional)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Auth

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Nixamuddin/Mern_Expense_Tracker.git
cd Mern_Expense_Tracker
```

### Backend Setup:
```bash
cd backend
npm install

# Create .env file with the following:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

npm run dev
```

### Frontend Setup:
```bash
cd ../frontend
npm install
npm start
```

---

## 📁 Folder Structure (example)
```
Mern_Expense_Tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   └── public/
├── README.md
```

---

## 🧪 API Routes (optional)

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/expenses/`
- `POST /api/expenses/`
- `DELETE /api/expenses/:id`

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 🙋‍♂️ Author

Made by [Nixamuddin](https://github.com/Nixamuddin)
