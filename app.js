const express = require('express');
const sql = require('mssql');
const providersRoutes = require('./routes/providers');
const productsRoutes = require('./routes/products');
const salesHistoryRoutes = require('./routes/sales_history');
const membershipRoutes = require('./routes/memberships');
const memberRoutes = require('./routes/members');
const authRoutes = require('./routes/auth');
const { expressjwt: expressJwt } = require('express-jwt');
const cors = require('cors');

const config = {
    user: 'administrador_carlos',
    password: 'administrador',
    server: 'flowfit.mssql.somee.com', 
    database: 'flowfit',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(config).then(() => {
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

app.use('/providers', providersRoutes);
app.use('/products', productsRoutes);
app.use('/sales_history', salesHistoryRoutes);
app.use('/memberships', membershipRoutes);
app.use('/members', memberRoutes);
app.use('/auth', authRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
