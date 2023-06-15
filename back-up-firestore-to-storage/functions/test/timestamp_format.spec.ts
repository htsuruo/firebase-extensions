import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatTimestamp } from '../src/format'
import * as dayjs from 'dayjs'

const defaultFormat = 'YYYY-MM-DDTHH:mm:ss_SSS'

describe('formatTimestamp function test', () => {
  const date = new Date()
  const iso = date.toISOString()
  it('format parameter is undefined: YYYY-MM-DDTHH:mm:ss_SSS', () => {
    expect(formatTimestamp({ timestamp: iso })).to.equal(
      dayjs(date).format(defaultFormat)
    )
  })
  it('format parameter: YYYY-MM-DD', () => {
    const format = 'YYYY-MM-DD'
    expect(formatTimestamp({ timestamp: iso, format })).to.equal(
      dayjs(date).format(format)
    )
  })
  it('format parameter: YYYY-MM-DDTHH:mm:ssZ[Z]', () => {
    const format = 'YYYY-MM-DDTHH:mm:ssZ[Z]'
    expect(formatTimestamp({ timestamp: iso, format })).to.equal(
      dayjs(date).format(format)
    )
  })
  // Cannot detect invalid format string…
  it('format parameter is invalid: INVALID_STRING', () => {
    expect(
      formatTimestamp({ timestamp: iso, format: 'INVALID_STRING' })
    ).to.equal(dayjs(date).format('INVALID_STRING'))
  })
})
