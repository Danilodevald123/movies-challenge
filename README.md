Movies Challenge
Una API RESTful para gestionar una colección de películas, construida con NestJS.

Descripción
Movies Challenge es una aplicación backend desarrollada con NestJS, diseñada para demostrar habilidades en el desarrollo de APIs modernas. La aplicación permite realizar operaciones CRUD sobre películas, integrando funcionalidades de búsqueda y filtrado, y utiliza TypeORM para la gestión de la base de datos. Su arquitectura robusta y escalable la hace ideal para proyectos de aprendizaje y desafíos de programación.

Características
Operaciones CRUD: Permite crear, leer, actualizar y eliminar registros de películas.
Búsqueda y filtrado: Realiza búsquedas por título, género, año de lanzamiento y otros criterios.
Integración con Base de Datos: Utiliza TypeORM para interactuar con bases de datos relacionales.
Validación y Manejo de Errores: Incluye validaciones robustas y manejo de errores para asegurar la integridad de los datos.
Pruebas: Cuenta con pruebas unitarias y pruebas de extremo a extremo para garantizar el correcto funcionamiento de la aplicación.
Tecnologías Utilizadas
NestJS - Framework progresivo para construir aplicaciones Node.js eficientes y escalables.
TypeScript - Superset de JavaScript que añade tipado estático.
TypeORM - ORM para la gestión de bases de datos en Node.js.
Node.js - Entorno de ejecución para JavaScript.
Jest - Framework para pruebas.
Comenzando
Prerrequisitos
Node.js v20 o superior.
npm (incluido con Node.js)
Una base de datos compatible con TypeORM (por ejemplo, PostgreSQL, MySQL, SQLite)
Instalación
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/Danilodevald123/movies-challenge.git
cd movies-challenge
Instalar las dependencias:

bash
Copiar
Editar
npm install
Configurar el entorno:

Es necesario contar con dos archivos de configuración: .env y .env.test.
Ambos deben contener la misma información de configuración.
Si existe un archivo de ejemplo (por ejemplo, .env.example), cópialo y renómbralo a .env y .env.test, luego actualiza las variables de entorno según tu entorno de desarrollo y pruebas.

Ejecución de la Aplicación
Modo Desarrollo:

bash
Copiar
Editar
npm run start:dev
Modo Producción:

bash
Copiar
Editar
npm run start:prod
Modo Watch:

bash
Copiar
Editar
npm run start
La API se ejecutará en http://localhost:3000 de forma predeterminada.

Ejecución de Pruebas
Pruebas Unitarias:

bash
Copiar
Editar
npm run test
