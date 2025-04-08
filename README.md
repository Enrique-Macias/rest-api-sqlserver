# REST API con SQL Server y MongoDB

Este proyecto es una aplicación web que utiliza una API REST para gestionar datos en SQL Server y MongoDB, con autenticación JWT y una interfaz de usuario moderna.

## 🚀 Características

- Autenticación JWT segura
- Dashboard para visualizar datos de SQL Server
- Dashboard para visualizar datos de MongoDB
- Interfaz de usuario moderna y responsiva
- Gestión de sesiones de usuario
- Conexión a múltiples bases de datos

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- SQL Server
- MongoDB
- npm o yarn

## 🔧 Configuración

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd rest-api-sqlserver
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
# Configuración de SQL Server
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SERVER=tu_servidor
DB_DATABASE=tu_base_de_datos
DB_PORT=1433

# Configuración de MongoDB
MONGO_URI=mongodb://tu_usuario:tu_contraseña@tu_servidor:27017/tu_base_de_datos

# Configuración de JWT
JWT_SECRET=tu_secreto_jwt

# Puerto del servidor
PORT=3000
```

## 🏃‍♂️ Ejecución

1. Iniciar el servidor backend:
```bash
npm run dev
```

2. En una nueva terminal, iniciar el frontend:
```bash
cd src/frontend
npm install
npm start
```

3. Acceder a la aplicación:
Abre tu navegador y visita:
```
http://localhost:3000
```

## 📝 Credenciales de prueba

Para acceder a la aplicación, puedes usar las siguientes credenciales:
- Email: test@test.com
- Contraseña: contra123

## 🛠️ Estructura del Proyecto

```
rest-api-sqlserver/
├── config/          # Configuraciones de bases de datos
├── controllers/     # Controladores de la API
├── middleware/      # Middleware de autenticación
├── models/          # Modelos de datos
├── routes/          # Rutas de la API
├── src/            # Código fuente del frontend
│   └── frontend/   # Aplicación React
├── utils/          # Utilidades y helpers
├── .env            # Variables de entorno
└── server.js       # Punto de entrada del servidor
```

## 🔐 Seguridad

- Autenticación mediante JWT
- Hash de contraseñas con bcrypt
- Protección de rutas con middleware
- Manejo seguro de tokens
 