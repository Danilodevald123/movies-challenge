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
npm run start
```

5. Para correr los test:
```bash
npm test
```

6. Al levantar el proyecto veras un log con la url directa a la documentacion en Swagger, se vera algo como esto:
```bash
Swagger documentation is available at: http://localhost:3000/api-docs
```

7. la api esta hosteada en un server gratuito:

url base: https://movies-challenge-y4a2.onrender.com.

.env para probar la conexion remota: 
```
DB_HOST=bbiqdu6lakrtza8iloh0-mysql.services.clever-cloud.com
DB_PORT=3306
PORT=3000
DB_USERNAME=uwkoidspegbpmo8o
DB_PASSWORD=jbpKBJGhIMIcpTc9Iaes
DB_DATABASE=bbiqdu6lakrtza8iloh0
JWT_SECRET=tu_secreto_super_seguro_aqui
```

8. Para testear exitosamente.

* Crear 2 usuarios desde el endpoint de registro.

* Modificar 1 de los usuarios desde la bd, para tener el rol de admin. 

* Validar cada endpoint :) 

9. Cualquier correcion, recomendacion o consejo, será mas que bienvenido, gracias. 




