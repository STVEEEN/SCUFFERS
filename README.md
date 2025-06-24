Integrantes: 
Carlos Daniel Bonilla Mendez
Eduardo Steven Chavez Ramirez
 
SCUFFERS - Tienda en línea de ropa, Bienvenido a SCUFFERS, una tienda diseñada para la venta de ropa con un diseño minimalista y funcional al alcance de tu mano. Implementado con el stack MERN (MongoDB, Express.js, React, Node.js).

 Instalación y ejecución, requisitos previos Asegúrate de tener instalados:

Node.js

MongoDB

Un gestor de paquetes como npm

2️⃣ Instalación Ejecuta los siguientes comandos en tu terminal:

git bash

Clonar el repositorio
git clone https://github.com/tu_usuario/optilux.git

Entrar al directorio
cd SCUFFERS

Instalar dependencias del servidor
cd backend 
npm install

Instalar dependencias del cliente
cd .\SCUFFERS-public\ o cd .\SCUFFERS-public\ npm install

3️⃣ Configuración Crea un archivo .env en la carpeta backend y añade las variables de entorno:

DB_URI="mongodb+srv://messidaniel862007:SCUFFERS@scuffers.40f92.mongodb.net/?retryWrites=true&w=majority&appName=SCUFFERS"
PORT="4000"
JWT_SECRET="secret1234"
JWT_EXPIRES="30d"
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="admin123"
 
EMAIL_USER="cuper.fcb@gmail.com"
EMAIL_PASS="ijbo ywku ikoq epht"
 
CLOUDINARY_NAME="djxsqjpfh"
CLOUDINARY_API_KEY="528121694288851"
CLOUDINARY_API_SECRET="ar21c9M9pHsmJtgvT6YHB6jlHVE"
CLOUDINARY_API_ENVIRONMENT="CLOUDINARY_URL=cloudinary://528121694288851:ar21c9M9pHsmJtgvT6YHB6jlHVE@djxsqjpfh"
 

4️⃣ Ejecución Para levantar el servidor y el cliente en modo desarrollo:

bash

Iniciar el backend
cd backend npm run dev o node index.js

Iniciar el frontend
cd .\SCUFFERS-public\ o cd .\SCUFFERS-public\ npm run dev

🛠️ Tecnologías utilizadas Este proyecto usa las siguientes herramientas:

MongoDB – Base de datos NoSQL

Express.js – Framework backend en Node.js

React – Biblioteca para la interfaz de usuario

Node.js – Entorno de ejecución

Mongoose – ODM para MongoDB

Tailwind CSS – Estilización rápida y moderna

JWT (JSON Web Token) – Autenticación segura

📂 Estructura de proyecto La organización de carpetas es la siguiente:

SCUFFERS/
├── backend/                  # Código del servidor
│   ├── src/                  # Código fuente principal
│   │   ├── controllers/      # Lógica de manejo de rutas
│   │   ├── middleware/       # Middlewares (ej: autenticación)
│   │   ├── models/           # Modelos de base de datos
│   │   ├── routes/           # Definición de rutas
│   │   └── utils/            # Utilidades compartidas
│   ├── config.js             # Configuraciones globales
│   ├── .env                  # Variables de entorno
│   ├── app.js                # Configuración de Express
│   ├── database.js           # Conexión a la DB
│   ├── index.js              # Punto de entrada del backend
│   ├── package.json          # Dependencias del backend
│   └── .gitignore            # Archivos ignorados por Git
│
├── frontend/                 # Código del cliente
│   ├── public/               # Assets estáticos (HTML, imágenes)
│   ├── src/                  # Código fuente principal
│   │   ├── components/       # Componentes reutilizables
│   │   ├── context/          # Estado global (React Context)
│   │   ├── hooks/            # Custom Hooks
│   │   ├── img/              # Imágenes del proyecto
│   │   ├── pages/            # Páginas/views
│   │   ├── App.css           # Estilos principales
│   │   ├── App.jsx           # Componente raíz
│   │   ├── index.css         # Estilos globales
│   │   ├── main.jsx          # Punto de entrada del frontend
│   │   └── ...               
│   ├── .eslintrc.js          # Configuración de ESLint
│   ├── index.html            # Template HTML
│   ├── package.json          # Dependencias del frontend
│   ├── vite.config.js        # Configuración de Vite
│   └── .gitignore            # Archivos ignorados por Git
│
├── README.md                 # Documentación del proyecto
└── .gitignore                # Gitignore global (opcional)
