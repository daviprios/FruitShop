import { ShoppingCartList } from "types/ShoppingCart"

interface StorageItem{
  name: string,
  data: storagableData
}

interface ShoppingCartStorage extends StorageItem{
  name: 'shoppingCartStorage',
  data: ShoppingCartList,
}

interface ImageStorage extends StorageItem{
  name: string,
  data: string
}

type storagableName = 'shoppingCartStorage' | string
type storagableData = ShoppingCartList | string

class LocalStorage{
  private static folder = '@fruitshop/'

  static store<StoreType extends StorageItem>(storagable: StoreType){
    localStorage.setItem(`${this.folder}${storagable.name}`, JSON.stringify(storagable.data))
  }
  
  static load<StoragableType extends storagableData>(storagableName: storagableName): StoragableType | null{
    const stored = localStorage.getItem(`${this.folder}${storagableName}`)
    if(stored === null) return stored
    return JSON.parse(stored)
  }

  static remove(storagableName: storagableName){
    localStorage.removeItem(`${this.folder}${storagableName}`)
  }

  static clearAll(){
    localStorage.clear()
    console.log('Cache cleared')
  }
}

export type { ShoppingCartStorage, ImageStorage }
export default LocalStorage