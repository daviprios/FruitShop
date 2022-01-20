import axios from 'axios'

class ImageRequester {
  async getImage (search: string) {
    try {
      search = search.replace(' ', '%20')
      const res = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${search}&safe_search=1&sort=relevance&format=json&nojsoncallback=1`)
      const obj = res.data
      const { farm: farmId, server: serverId, id, secret } = obj?.photos?.photo[0]
      return `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
    } catch (err) {
      throw new Error('Image requester error')
    }
  }
}

export default ImageRequester