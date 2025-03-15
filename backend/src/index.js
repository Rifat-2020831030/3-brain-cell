const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const cookieParser = require('cookie-parser') ;
const { AppDataSource } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');

const app = express();
const PORT = config.port;
  
app.use(express.json());

app.use(cors ({
  origin: 'http://localhost:5173' ,
  methods: ["GET" , "PUT" ,"DELETE" ,"POST"],
  credentials: true ,
  optionSuccessStatus:200,

})) ;

app.use(cookieParser()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/profile',profileRoutes);
app.use('/organizations', organizationRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/coordinators', coordinatorRoutes);



AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Database connection error:', error));