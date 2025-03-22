const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const config = require('./config/env');
const { AppDataSource } = require('./config/database');
const socket = require('./socket'); 

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
  optionSuccessStatus: 200,
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/coordinators', coordinatorRoutes);
app.use('/organizations', organizationRoutes);
app.use('/volunteers', volunteerRoutes);


AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    const io = socket.init(server, {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    });
    server.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => console.error('Database connection error:', error));
