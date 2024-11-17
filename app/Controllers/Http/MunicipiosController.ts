import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio'
import MunicipioValidator from 'App/Validators/MunicipioValidator'

export default class MunicipiosController {
    // Método para obtener un municipio o todos los municipios
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theMunicipio: Municipio = await Municipio.findOrFail(params.id)
            return theMunicipio
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Municipio.query().paginate(page, perPage)
            } else {
                return await Municipio.query()
            }
        }
    }

    // Método para crear un nuevo municipio
    public async create({ request }: HttpContextContract) {
        await request.validate(MunicipioValidator)
        const body = request.body()
        const theMunicipio: Municipio = await Municipio.create(body)
        return theMunicipio
    }

    // Método para actualizar un municipio
    public async update({ params, request }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id)
        const body = request.body()
        theMunicipio.nombre = body.nombre
        theMunicipio.departamento_id = body.departamento_id
        return await theMunicipio.save()
    }

    // Método para eliminar un municipio
    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id)
        response.status(204)
        return await theMunicipio.delete()
    }
}
