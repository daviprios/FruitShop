import axios from 'axios'
import CacheImage from 'services/cacheImage'

class ImageRequester {
  async getImage (name: string) {
    try {
      const cachedImage = CacheImage.load(name)
      if(cachedImage){
        //console.log('image loaded from cache')
        return cachedImage
      }

      const search = name.replace(' ', '%20')
      const res = await axios
        .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${search}&safe_search=1&sort=relevance&format=json&nojsoncallback=1`)

      const obj = res.data
      const photoInfo = obj?.photos?.photo[0]
      if(photoInfo === undefined || photoInfo === null) console.error(`Couldn't load image for ${search}`)
      const { farm: farmId, server: serverId, id, secret } = photoInfo

      const imageUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
      CacheImage.store(name, imageUrl)
      //console.log('image loaded from api')
      return imageUrl
    } catch (err) { throw new Error('Image requester error') }
  }
}

export default ImageRequester