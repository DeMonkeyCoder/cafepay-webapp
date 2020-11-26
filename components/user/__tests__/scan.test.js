import scan from '../scan.vue'

describe("scan", () => {
  test("data type check", () => {
    // expect(scan.methods.tokenProccessor('cafepay.app/store/token?=123456').toBe('123456'))
    expect(typeof scan.data).toBe('function')

  })
})
