import Etcd from 'node-etcd'
import ConfetaText from 'confeta-text'

class ConfetaEtcd extends ConfetaText {
  constructor (hosts, path, etcdOptions = {}, confetaOptions = {}) {
    const etcd = new Etcd(hosts, etcdOptions)
    const { body: {node: {value = '{}'}} } = etcd.getSync(path)

    super(value, {parseFn: confetaOptions.parseFn})
  }
}

export default function createInstance (...args) {
  return new ConfetaEtcd(...args)
}

