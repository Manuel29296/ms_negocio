import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Servicio from "App/Models/Servicio";
import ServicioValidator from "App/Validators/ServicioValidator";
import axios from "axios";
import path from "path";
import fs from "fs";

export default class ServiciosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theServicio: Servicio = await Servicio.findOrFail(params.id);
      return theServicio;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        let servicios: Servicio[] = await Servicio.query()
          .preload("administrador")
          .paginate(page, perPage);
        return servicios;
      } else {
        return await Servicio.query();
      }
    }
  }

  
  public async create({ request }: HttpContextContract) {
    await request.validate(ServicioValidator);
    const body = request.body();
    // Parsear origen y destino para obtener arrays
    const origen = JSON.parse(body.origen);
    const destino = JSON.parse(body.destino);
    if (!Array.isArray(origen) || !Array.isArray(destino) || origen.length !== 2 || destino.length !== 2) {
        throw new Error('Los valores de origen y destino deben ser arrays válidos con dos elementos [lat, lng].');
    }

    const theServicio: Servicio = await Servicio.create(body);

    // Generar HTML del mapa dinámicamente
    const mapaHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Seguimiento de su ruta</title>
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <style>
            #map { height: 100vh; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
            const origin = [${origen[0]}, ${origen[1]}];
            const destination = [${destino[0]}, ${destino[1]}];
    
            const map = L.map('map').setView(origin, 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
    
            const marker = L.marker(origin).addTo(map);
            const polyline = L.polyline([origin], { color: 'blue' }).addTo(map);
    
            function haversine(lat1, lon1, lat2, lon2) {
              const R = 6371;
              const dLat = (lat2 - lat1) * Math.PI / 180;
              const dLon = (lon2 - lon1) * Math.PI / 180;
              const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              return R * c;
            }
    
            function interpolate(lat1, lon1, lat2, lon2, fraction) {
              const lat = lat1 + (lat2 - lat1) * fraction;
              const lon = lon1 + (lon2 - lon1) * fraction;
              return [lat, lon];
            }
    
            const totalDistance = haversine(origin[0], origin[1], destination[0], destination[1]);
            const stepDistance = 1;
            const steps = Math.ceil(totalDistance / stepDistance);
            const stepFraction = 1 / steps;
    
            let currentStep = 0;
    
            function updateMarker() {
              if (currentStep <= steps) {
                const position = interpolate(
                  origin[0], origin[1],
                  destination[0], destination[1],
                  currentStep * stepFraction
                );
                marker.setLatLng(position);
                polyline.addLatLng(position);
                map.panTo(position);
                currentStep++;
              } else {
                clearInterval(interval);
              }
            }
    
            const interval = setInterval(updateMarker, 1000);
          </script>
        </body>
        </html>`;

    // Guardar el HTML del mapa en el sistema de archivos
    const mapsDirectory = path.resolve(
      __dirname,
      "../../mapas",
      `mapa_${theServicio.id}.html`
    );
    if (!fs.existsSync(mapsDirectory)) {
      // Crear la carpeta si no existe
      fs.mkdirSync(mapsDirectory, { recursive: true });
    }
    // Guardar el archivo del mapa
    const mapFilePath = path.join(mapsDirectory, `mapa_${theServicio.id}.html`);
    fs.writeFileSync(mapFilePath, mapaHTML);

    // URL del mapa
    const mapURL = `http://127.0.0.1:5500/app/mapas/mapa_${theServicio.id}.html/mapa_${theServicio.id}.html`;

    // Preparar los datos para el correo
    const emailData = {
      email: body.email,
      subject: "Servicio asignado",
      body: `
                Detalles del servicio asignado:
    
                ID: ${theServicio.id}
                Descripción: ${theServicio.descripcion}
                Precio: ${theServicio.precio}
                Tipo: ${theServicio.tipo}
                Fecha: ${theServicio.fecha}
                Seguimiento: ${mapURL}
            `,
    };

    try {
      const emailResponse = await axios.post(
        "http://127.0.0.1:5000/send-email",
        emailData
      );

      if (emailResponse.status === 200) {
        console.log("Email sent");
      } else {
        console.log("Email not sent");
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theServicio: Servicio = await Servicio.findOrFail(params.id);
    const body = request.body();
    theServicio.descripcion = body.descripcion;
    theServicio.precio = body.precio;
    theServicio.tipo = body.tipo;
    theServicio.fecha = body.fecha;
    return await theServicio.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theServicio: Servicio = await Servicio.findOrFail(params.id);
    response.status(204);
    return await theServicio.delete();
  }
}
