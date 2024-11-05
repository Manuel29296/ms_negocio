import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriaProducto from 'App/Models/CategoriaProducto'
import CategoriaProductoValidator from 'App/Validators/CategoriaProductoValidator'

export default class CategoriaProductosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const categoriaProducto = await CategoriaProducto.findOrFail(params.id)
            return categoriaProducto
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await CategoriaProducto.query().paginate(page, perPage)
            } else {
                return await CategoriaProducto.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(CategoriaProductoValidator)
        const body = request.body()
        const categoriaProducto = await CategoriaProducto.create(body)
        return categoriaProducto
    }

    public async update({ params, request }: HttpContextContract) {
        const categoriaProducto = await CategoriaProducto.findOrFail(params.id)
        const body = request.body()
        categoriaProducto.producto_id = body.producto_id
        categoriaProducto.categoria_id = body.categoria_id
        return await categoriaProducto.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const categoriaProducto = await CategoriaProducto.findOrFail(params.id)
        response.status(204)
        return await categoriaProducto.delete()
    }
}

