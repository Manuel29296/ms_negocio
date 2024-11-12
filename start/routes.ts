/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/facturas"
import "./routes/propietarioVehiculo"
import "./routes/seguros"
import "./routes/vehiculos"
import "./routes/propietarios"

import "./routes/categoriaProductos"
import "./routes/categorias"
import "./routes/lotes"
import "./routes/productos"
import "./routes/rutas"

import "./routes/usuarios"
import "./routes/hotel"
import "./routes/servicios"
import "./routes/conductores"
import "./routes/turnos"
import "./routes/vehiculoConductor"

