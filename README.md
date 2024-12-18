# Star Wars API 🌌🔫

![alt text](image.png)

## Descripción

La Star Wars API es una aplicación backend serverless desarrollada con arquitectura hexagonal. Proporciona una interfaz para gestionar información relacionada con películas de Star Wars, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos almacenados en DynamoDB.

Este proyecto está construido con TypeScript y utiliza el framework Serverless para facilitar el despliegue en entornos AWS.

## Tecnologías Utilizadas

- Lenguaje: TypeScript
- Framework: Serverless
- Base de Datos: AWS DynamoDB
- Testing: Jest
- Arquitectura: Hexagonal

## Postman Collection

- `DEV.postman_environment`
- `StarWarsAPI.postman_collection`

## Instalación

1. Instalar Dependencias

Asegúrate de tener Node.js instalado (versión 14 o superior).

```bash
npm install
```

### Configuración

1. Configurar Credenciales de AWS
   La aplicación utiliza AWS para desplegar los servicios serverless y gestionar DynamoDB. Asegúrate de tener configuradas tus credenciales de AWS. Puedes configurar las credenciales usando el AWS CLI:

```bash
aws configure
```

2. Variables de Entorno

Crea un archivo .env en la raíz del proyecto y define las variables necesarias:

```bash
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=tu_región
DYNAMO_TABLE_FILM=FilmsTable
```

3. Configurar serverless.ts

Asegúrate de que el archivo serverless.ts contiene las credenciales y configuraciones necesarias. Reemplaza las variables de entorno según tus necesidades.

## Uso

1. Ejecutar el Servidor Local

```bash
npm run dev
```

Esto iniciará el servidor localmente y podrás interactuar con la API a través de los endpoints definidos.

Endpoints Disponibles
• GET /films: Obtener una lista de todas las películas.
• POST /films: Crear una nueva película.
• GET /films/{id}: Obtener una película por su ID.
• PUT /films/{id}: Actualizar una película existente.
• DELETE /films/{id}: Eliminar (marcar como inactiva) una película.

## Pruebas

El proyecto incluye pruebas unitarias y de integración para asegurar la calidad y funcionalidad del código.

### Ejecutar Pruebas Unitarias

```bash
npm run test
```

### Cobertura de Pruebas

Para generar un reporte de cobertura:

```bash
npm run test:coverage
```

## Despliegue

El despliegue de la aplicación se realiza utilizando el framework Serverless.

### Desplegar a AWS

1. Construir el Proyecto

```bash
npm run build
```

2. Desplegar

```bash
npm run deploy
```

Esto empaquetará y desplegará la aplicación en AWS, creando los recursos necesarios como funciones Lambda, API Gateway y tablas DynamoDB.

Contacto

¡Gracias por utilizar la Star Wars API! Que la Fuerza te acompañe.
