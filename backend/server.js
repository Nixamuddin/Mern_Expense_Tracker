import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors';
import UserRoute from './Route/UserRoute.js';
import { connect } from './Lib/Connection.js';
import categoryRoute from './Route/CategpryRoute.js';
import TransactionRutes from './Route/TransactionRoute.js';
const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));
app.use(cookieparser());
app.use(morgan());
const port = process.env.PORT || 8000;
dotenv.config();
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/transaction", TransactionRutes)
app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.listen(port, connect(), () => {
  console.log(`Server running at http://localhost:${port}`);
});