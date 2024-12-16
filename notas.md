public async find({ request, params }: HttpContextContract) {
  const { page, per_page } = request.only(["page", "per_page"]);
  const conductorsQuery = Conductor.query().preload("usuario"); // Pre-carga la relación 'usuario'
  let conductors: ModelObject[] = [];
  const metaAux: ModelObject[] = [];

  if (params.id) {
    const theConductor = await conductorsQuery.where("id", params.id).firstOrFail();
    conductors.push(theConductor);
  } else if (page && per_page) {
    const { meta, data } = await conductorsQuery.paginate(page, per_page).then((res) => res.toJSON());
    metaAux.push(meta);
    conductors.push(...data);
  } else {
    conductors = await conductorsQuery;
  }

  // Obtener la información del usuario para cada Conductor
  conductors = conductors.map((conductor: Conductor) => {
    const { name, email } = conductor.usuario;
    return {
      name,
      email,
      ...conductor.toJSON(),
    };
  });

  if (metaAux.length > 0) {
    return { meta: metaAux, data: conductors };
  }

  return conductors;
}