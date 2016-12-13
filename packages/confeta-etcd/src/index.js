import Etcd from 'node-etcd'
import ConfetaText from 'confeta-text'

const $confetaText = Symbol('confetaText')

class ConfetaEtcd {
  constructor (hosts, etcdOptions = {}, confetaOptions = {}) {
    const path = confetaOptions.path || ''
    const etcd = new Etcd(hosts, etcdOptions)
    const { node: {value} } = etcd.getSync(path)

    this[$confetaText] = ConfetaText(value, {parseFn: confetaOptions.parseFn})
  }

  get (segments) {
    return this[$confetaText].get(segments)
  }
}

export default function createInstance (options) {
  return new ConfetaEtcd(options)
}

