import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto'
import ProductoValidator from 'App/Validators/ProductoValidator'

export default class ProductosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const producto = await Producto.findOrFail(params.id)
            return producto
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Producto.query().paginate(page, perPage)
            } else {
                return await Producto.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ProductoValidator)
        const body = request.body()
        const producto = await Producto.create(body)
        return producto
    }

    public async update({ params, request }: HttpContextContract) {
        const producto = await Producto.findOrFail(params.id)
        const body = request.body()

        producto.merge(body) // Usar merge para actualizar el producto
        await producto.save() // Guardar cambios
        return producto // Retornar el producto actualizado
    }

    public async delete({ params, response }: HttpContextContract) {
        const producto = await Producto.findOrFail(params.id)
        await producto.delete()
        return response.status(204) // Responder con estado 204 No Content
    }
}

