import Etcd from 'node-etcd'
import ConfetaText from 'confeta-text'

class ConfetaEtcd extends ConfetaText {
  constructor (hosts, path, etcdOptions = {}, confetaOptions = {}) {
    const etcd = new Etcd(hosts, etcdOptions)
    const result = etcd.getSync(path)

    let parseFn = confetaOptions.parseFn

    if (result.err) {
      if (result.err.errorCode === 100) { // key not found - ignore
        parseFn = () => ({}) // return empty object
      } else {
        let message = result.err.error && result.err.error.message && ': ' + result.err.error.message

        throw new Error(`Error accessing etcd${message}`)
      }
    }

    const { body: {node: {value = '{}'}} } = result

    super(value, { parseFn })
  }
}

export default function createInstance (...args) {
  return new ConfetaEtcd(...args)
}
