# MISAPIS-Netflix_DB
node index.js ( corre en el puerto 3000 y se coneta a la base de datos)

 http://localhost:3000/api/netflix
| Método | Ruta               | Descripción                         |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/api/netflix`     | Obtener todas las producciones      |
| GET    | `/api/netflix/:id` | Obtener una producción por su ID    |
| POST   | `/api/netflix`     | Crear una nueva producción          |
| PUT    | `/api/netflix/:id` | Actualizar una producción por su ID |
| DELETE | `/api/netflix/:id` | Eliminar una producción por su ID   |
