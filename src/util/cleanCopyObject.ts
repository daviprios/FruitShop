const cleanCopyObject = <T>(objectToCopy: T): T => {
  return JSON.parse(JSON.stringify(objectToCopy))
}

export { cleanCopyObject }