import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CategoriaValidator from 'App/Validators/CategoriaValidator'

export default class CategoriasController {
    // Método para buscar una categoría por ID o listar todas las categorías
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            // Si se proporciona un ID, buscar la categoría
            const theCategoria: Categoria = await Categoria.findOrFail(params.id)
            return theCategoria
        } else {
            // Si no se proporciona ID, paginar o listar todas las categorías
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Categoria.query().paginate(page, perPage)
            } else {
                return await Categoria.query()
            }
        }
    }

    // Método para crear una nueva categoría
    public async create({ request }: HttpContextContract) {
        await request.validate(CategoriaValidator) // Validar los datos de entrada
        const body = request.body()
        const theCategoria: Categoria = await Categoria.create(body) // Crear la categoría
        return theCategoria
    }

    // Método para actualizar una categoría existente
    public async update({ params, request }: HttpContextContract) {
        const theCategoria: Categoria = await Categoria.findOrFail(params.id) // Buscar la categoría por ID
        const body = request.body()

        // Actualizar los atributos
        theCategoria.nombre = body.nombre
        theCategoria.descripcion = body.descripcion
        theCategoria.tipo_producto = body.tipo_producto
        theCategoria.requisitos_de_transporte = body.requisitos_de_transporte
        theCategoria.parent_id = body.parent_id

        return await theCategoria.save() // Guardar cambios
    }

    // Método para eliminar una categoría
    public async delete({ params, response }: HttpContextContract) {
        const theCategoria: Categoria = await Categoria.findOrFail(params.id) // Buscar la categoría por ID
        response.status(204) // Responder con estado 204 No Content
        return await theCategoria.delete() // Eliminar la categoría
    }
}

