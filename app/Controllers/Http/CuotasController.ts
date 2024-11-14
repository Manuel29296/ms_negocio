import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cuota from "App/Models/Cuota";
import CuotaValidator from "App/Validators/CuotaValidator";

export default class CuotasController {
  // public async index({ response }: HttpContextContract) {
  //   const cuotas = await Cuota.all()
  //   return response.ok(cuotas)
  // }

  // public async store({ request, response }: HttpContextContract) {
  //   const data = request.only(['monto', 'fechaPago', 'contrato_id'])
  //   const cuota = await Cuota.create(data)
  //   return response.created(cuota)
  // }

  // public async show({ params, response }: HttpContextContract) {
  //   const cuota = await Cuota.findOrFail(params.id)
  //   return response.ok(cuota)
  // }

  // public async update({ params, request, response }: HttpContextContract) {
  //   const cuota = await Cuota.findOrFail(params.id)
  //   const data = request.only(['monto', 'fechaPago'])

  //   cuota.merge(data)
  //   await cuota.save()
  //   return response.ok(cuota)
  // }

  // public async destroy({ params, response }: HttpContextContract) {
  //   const cuota = await Cuota.findOrFail(params.id)
  //   await cuota.delete()
  //   return response.noContent()
  // }
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCuota: Cuota = await Cuota.findOrFail(params.id);
      return theCuota;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        let Cuotas: Cuota[] = await Cuota.query()
          .preload("factura")
          .paginate(page, perPage);
        return Cuotas;
      } else {
        return await Cuota.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(CuotaValidator);
    const body = request.body();
    const theCuota: Cuota = await Cuota.create(body);
    return theCuota;
  }

  // public async update({ params, request }: HttpContextContract) {
  //     const theCuota: Cuota = await Cuota.findOrFail(params.id);
  //     const body = request.body();
  //     theCuota.marca = body.marca;
  //     theCuota.tipo_carga = body.tipoCarga;
  //     theCuota.placa = body.placa;
  //     theCuota.capacidad = body.capacidad;
  //     return await theCuota.save();
  // }

  public async delete({ params, response }: HttpContextContract) {
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    response.status(204);
    return await theCuota.delete();
  }
}
