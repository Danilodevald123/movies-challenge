# 🎬 Movies Challenge


## 🛠️ Tecnologías Utilizadas

- Nestjs
- mySQL
- TypeORM
- Jest
- TypeScript

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 20 o superior)
- npm o yarn

Ademas deberas crear una base de datos mySQL.


## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Danilodevald123/movies-challenge.git
```

2. Instala las dependencias:
```bash
cd movies-challenge
npm install
```

3. Crea un archivo .env y un .env.test y configura las variables de entorno necesarias:
```
example: 

DB_HOST=localhost
DB_PORT=3306
PORT=3000
DB_USERNAME=root
DB_PASSWORD=prueba123
DB_DATABASE=movies
JWT_SECRET=tu_secreto_super_seguro_aqui
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Para correr los test:
```bash
npm test
```

6. Al levantar el proyecto veras un log con la url directa a la documentacion en Swagger, se vera algo como esto:
```bash
Swagger documentation is available at: http://localhost:3000/api-docs






