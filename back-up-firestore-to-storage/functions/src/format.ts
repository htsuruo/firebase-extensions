import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'

// dayjsでtimezoneプラグインを利用できるようにする
// 利用するプラグインはtimezoneのみだがutcプラグインに内部依存しているため両方の指定が必要
// ref. https://github.com/iamkun/dayjs/issues/1584#issuecomment-895110206
dayjs.extend(utc)
dayjs.extend(timezone)

// `exportDocuments`APIで`outputUriPrefix`が未指定の場合に生成される形式に準拠しフォーマットする
export function formatTimestamp(params: {
  timestamp: string
  timeZone?: string
  format?: string
}) {
  return dayjs(params.timestamp)
    .tz(params.timeZone)
    .format(params.format ?? 'YYYY-MM-DDTHH:mm:ss_SSS')
}
