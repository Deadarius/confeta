import fs from 'fs'
import path from 'path'
import sinon from 'sinon'

const jsonText = fs.readFileSync(path.resolve(__dirname, './fixture.json'), 'utf8')

const response = {
  body: {
    node: {
      value: jsonText
    }
  }
}

export const spy = {
  getSync: sinon
    .stub()
      .returns(response)
}

export default class FakeEtcd {
  constructor (hosts, options) {
    spy.hosts = hosts
    spy.options = options
    spy.arguments = arguments
  }

  getSync (path) {
    return spy.getSync(path)
  }
}
