export default function formatDuration(
  durationInSeconds: number,
  skipSeconds = false,
  maxElements?: number,
) {
  const secondsInMinute = 60
  const secondsInHour = secondsInMinute * 60
  const secondsInDay = secondsInHour * 24

  const days = Math.floor(durationInSeconds / secondsInDay)
  const hours = Math.floor((durationInSeconds % secondsInDay) / secondsInHour)
  const minutes = Math.floor((durationInSeconds % secondsInHour) / secondsInMinute)
  const seconds = durationInSeconds % secondsInMinute

  let formattedDuration = []
  if (days > 0) {
    formattedDuration.push(`${days} d`)
  }

  if (hours > 0) {
    formattedDuration.push(`${hours} h`)
  }

  if (minutes > 0) {
    formattedDuration.push(`${minutes} min`)
  }

  if ((!skipSeconds && seconds > 0) || formattedDuration.length === 0) {
    formattedDuration.push(`${seconds}s`)
  }

  if (maxElements) {
    return formattedDuration.slice(0, maxElements).join(', ')
  }

  return formattedDuration.join(', ')
}
