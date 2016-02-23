const types = {
  string: Symbol('confeta:string'),
  integer: Symbol('confeta:string'),
  float: Symbol('confeta:float'),
  boolean: Symbol('confeta:boolean'),
  date: Symbol('confeta:date'),
  array: Symbol('confeta:array'),
  arrayOf (type) {
    return [type]
  }
}

export default types
