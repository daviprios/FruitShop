import { ShoppingCartList } from "types/ShoppingCart"

interface StorageItem{
  name: string,
  data: storagableData
}

interface ShoppingCartStorage extends StorageItem{
  name: 'shoppingCartStorage',
  data: ShoppingCartList
}

type storagableName = 'shoppingCartStorage'
type storagableData = ShoppingCartList

class LocalStorage{
  private static folder = '@fruitshop/'

  static store<StoreType extends StorageItem>(storagable: StoreType){
    localStorage.setItem(`${this.folder}${storagable.name}`, JSON.stringify(storagable.data))
  }
  
  static load(storagableName: storagableName): storagableData | null{
    const stored = localStorage.getItem(`${this.folder}${storagableName}`)
    if(stored === null) return stored
    return JSON.parse(stored)
  }

  static remove(storagableName: storagableName){
    localStorage.removeItem(`${this.folder}${storagableName}`)
  }
}

export type { ShoppingCartStorage }
export default LocalStorage