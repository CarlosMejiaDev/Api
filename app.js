const express = require('express');
const mysql = require('mysql2/promise');
const workoutExercisesRoutes = require('./routes/workoutExercises');
const providersRoutes = require('./routes/providers');
const memberEntriesRoutes = require('./routes/member_entries');
const productsRoutes = require('./routes/products');
const salesHistoryRoutes = require('./routes/sales_history');
const membershipRoutes = require('./routes/memberships');
const memberRoutes = require('./routes/members');
const qrCodesRoutes = require('./routes/qr_codes');
const authRoutes = require('./routes/auth');
const workoutsRoutes = require('./routes/workouts');
const membershipSalesRoutes = require('./routes/membershipSales');
const exercisesRoutes = require('./routes/exercises');
const categoriesRoutes = require('./routes/categories');
const { expressjwt: expressJwt } = require('express-jwt');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const admin = require('firebase-admin');

// Configura tus credenciales de Firebase
var serviceAccount = require("./keyStorage.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "flowfitimagenes.appspot.com"
    });
}

const config = {
    host: 'srv1224.hstgr.io',
    user: 'u811511468_admin',
    password: 'Fl0wf1t@base',
    database: 'u811511468_flowfit',
};

mysql.createConnection(config).then(() => {
    console.log('Conexión a la base de datos exitosa!');
}).catch(err => {
    console.error('Error al conectar a la base de datos: ', err);
});

const app = express();

app.use(cors());
app.use(express.json());

// Utiliza el módulo expressJwt de express-jwt
app.use(expressJwt({
    secret: 'tu_secreto_jwt',
    algorithms: ['HS256']
}).unless({
    path: ['/auth/login', '/auth/register']
}));

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'FlowFit API',
      description: 'Documentación de la API de FlowFit',
      contact: {
        name: 'Soporte'
      },
      servers: ['http://localhost:3000']
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/membership_sales', membershipSalesRoutes);
app.use('/providers', providersRoutes);
app.use('/products', productsRoutes);
app.use('/workouts', workoutsRoutes);
app.use('/sales_history', salesHistoryRoutes);
app.use('/memberships', membershipRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/members', memberRoutes);app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/workout_exercises', workoutExercisesRoutes);
app.use('/qr_codes', qrCodesRoutes);
app.use('/member_entries', memberEntriesRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});