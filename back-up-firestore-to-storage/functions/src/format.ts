import * as dayjs from 'dayjs'
import * as timezone from 'dayjs/plugin/timezone'

// dayjsでtimeZoneプラグインを利用できるようにする
dayjs.extend(timezone)

// `exportDocuments`APIで`outputUriPrefix`が未指定の場合に生成される形式に準拠しフォーマットする
export function formatTimestamp(timestamp: string) {
  return dayjs(timestamp)
    .tz(process.env.TIME_ZONE)
    .format('YYYY-MM-DDTHH:mm:ss_SSS')
}
