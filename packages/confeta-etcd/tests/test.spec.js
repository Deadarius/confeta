import tape from 'tape'
import proxyquire from 'proxyquire'
import fakeEtcd, { spy } from './fake-etcd.js'

const ConfetaEtcd = proxyquire('../lib/index', {
  'node-etcd': fakeEtcd
}).default

tape('Hosts are passed correctly', test => {
  const hosts = ['https://fake.com/fake', 'https://fake2.com/fake2']
  ConfetaEtcd(hosts)
  test.equal(spy.hosts, hosts)

  test.end()
})

tape('Options are passed correctly', test => {
  ConfetaEtcd([], {a: 1, b: 2})
  test.equal(Object.keys(spy.options).length, 0)

  test.end()
})
