# Backend GraphQL - TicoAutos

Este proyecto corresponde al backend secundario de **TicoAutos**, una plataforma web para la publicación y consulta de vehículos en Costa Rica.  
Expone una API GraphQL de solo lectura que el frontend utiliza para consultar vehículos, usuarios, preguntas y respuestas de forma eficiente.

---

## Tecnologías utilizadas

- Node.js
- Express
- GraphQL Yoga
- MongoDB
- Mongoose
- JWT
- dotenv
- cors

---

## Funcionalidades principales

### Usuarios
- Consulta del usuario autenticado (`me`)

### Vehículos
- Consultar todos los vehículos con filtros y paginación
- Consultar vehículo por id (incluye datos del propietario)
- Consultar vehículos del usuario autenticado

### Preguntas
- Consultar preguntas por vehículo
- Consultar preguntas del usuario autenticado

### Respuestas
- Consultar respuestas por pregunta
- Consultar respuestas del usuario autenticado

---

## Instalación

1. Clonar el repositorio
2. Abrir la carpeta del proyecto en la terminal
3. Instalar dependencias:
```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` con los siguientes valores:

```
PORT=4000
DATABASE_URL=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
```

---

## Ejecución del proyecto

Para iniciar el servidor:
```bash
npm start
```

El servidor expone el endpoint GraphQL en:
```
http://localhost:4000/graphql
```

---

## Queries disponibles

### Usuarios
| Query | Autenticación | Descripción |
|-------|--------------|-------------|
| `me` | Requerida | Retorna los datos del usuario autenticado |

### Vehículos
| Query | Autenticación | Descripción |
|-------|--------------|-------------|
| `vehicles(filtros)` | No requerida | Retorna lista paginada de vehículos con filtros opcionales |
| `vehicle(id)` | No requerida | Retorna un vehículo por id, incluye datos del propietario |
| `vehiclesByUser` | Requerida | Retorna los vehículos publicados por el usuario autenticado |

### Preguntas
| Query | Autenticación | Descripción |
|-------|--------------|-------------|
| `questionsByVehicle(id_vehicle)` | Requerida | Retorna preguntas de un vehículo, incluye respuesta si existe |
| `questionsByUser` | Requerida | Retorna preguntas hechas por el usuario autenticado |

### Respuestas
| Query | Autenticación | Descripción |
|-------|--------------|-------------|
| `answersByQuestion(id_question)` | Requerida | Retorna respuestas de una pregunta |
| `answersByUser` | Requerida | Retorna respuestas del usuario autenticado |

---

## Filtros disponibles para `vehicles`

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `brand` | String | Marca del vehículo |
| `model` | String | Modelo del vehículo |
| `status` | String | Estado del vehículo |
| `minYear` | Int | Año mínimo |
| `maxYear` | Int | Año máximo |
| `minPrice` | Float | Precio mínimo |
| `maxPrice` | Float | Precio máximo |
| `page` | Int | Número de página (default: 1) |
| `limit` | Int | Resultados por página (default: 10) |

---

## Autenticación

Las queries protegidas requieren un token JWT en el header de la petición:

```
Authorization: Bearer tu_token_jwt
```

El token se obtiene al iniciar sesión en el backend REST (`:3000`).

---

## Relación con el Backend REST

Este backend es de **solo lectura**. Todas las operaciones de escritura (registro, login, publicar vehículos, preguntas, respuestas) se realizan a través del **Backend REST** en el puerto `3000`.

| Operación | Backend |
|-----------|---------|
| Registro / Login / 2FA | REST `:3000` |
| Publicar / Editar / Eliminar vehículo | REST `:3000` |
| Crear pregunta / respuesta | REST `:3000` |
| Consultar vehículos / usuario / preguntas | **GraphQL `:4000`** |

---

## Autor

Proyecto desarrollado como parte del curso de Web II.

- Dylan Jiménez Alfaro
- Emily Zúñiga Solano
