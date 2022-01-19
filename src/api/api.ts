import axios, { AxiosInstance } from 'axios'
import { FruitInformation } from 'types/FruitInformation'

interface ErrorResponse{
  error: string
}

class Api{
  constructor(){
    this.connection = axios.create({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3001/api/fruit/',
    })
  }

  private connection: AxiosInstance

  async getAllFruits(): Promise<Array<FruitInformation>>{
    try{
      const response = await this.connection.get<Array<FruitInformation>>('all')
      return response.data
    }
    catch(error){
      console.log(error)
      return []
    }
  }
}

export type { ErrorResponse }
export default Api