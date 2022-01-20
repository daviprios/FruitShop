import axios, { AxiosResponse } from "axios"
import LocalStorage, { ImageStorage } from "services/localStorage"
import { Buffer } from 'buffer'

class CacheImage{
  private static prefix = 'fruitImages/'

  static store(name: string, imageUrl: string){
    axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then((response: AxiosResponse<ArrayBuffer>) => {
        const image64 = Buffer.from(response.data).toString('base64')
        LocalStorage.store<ImageStorage>({ name: `${this.prefix}${name}`, data: image64 })
      })
      .catch((err) => console.log(err))
  }

  static load(name: string): string | null{
    const image64 = LocalStorage.load(`${this.prefix}${name}`)
    if(image64 === null) return null
    const imageSource = `data:image/png;base64,${image64}`
    return imageSource
  }
}

export default CacheImage