import axios, { AxiosInstance } from 'axios'

interface FruitInformation{
  genus: string,
  name: string,
  id: number,
  family: string,
  order: string,
  nutritions: FruitNutritions
}

interface FruitNutritions {
  carbohydrates: number,
  protein: number,
  fat: number,
  calories: number,
  sugar: number
}

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
    catch(err){
      console.log(err)
      return []
    }
  }
}

export type { FruitInformation, FruitNutritions, ErrorResponse }
export default Api