import axios from 'axios'

class ColombiaApiService {
  private baseUrl: string = 'https://api-colombia.com/api/v1'

  // Obtener todos los municipios
  public async getMunicipios() {
    try {
      const response = await axios.get(`${this.baseUrl}/City`)
      return response.data
    } catch (error) {
      throw new Error(`Error al obtener municipios: ${error.message}`)
    }
  }

  // Obtener un municipio por ID
  public async getMunicipio(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/City/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Error al obtener el municipio con ID ${id}: ${error.message}`)
    }
  }
}

export default new ColombiaApiService()

