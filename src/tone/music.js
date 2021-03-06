import Tone from "tone"

export const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export function pitchToToneNote (index) {
  const levelIndex = Math.floor(index / 12)
  const noteIndex = index % 12
  return `${notes[noteIndex]}${levelIndex}`
}

export function durationToToneDuration (number) {

  if (number === 0) {
    return "0m"
  }

  /*
  if (number >= 1) {
    return `${number}m`
  } else {
    return `${1/number}n`
  }
  */

  /*
  if (number >= 2) {
    return `${number-1}m`
  } else {
    return `${2/number}n`
  }
  */

  if (number >= 4) {
    return `${number-2}m`
  } else {
    return `${4/number}n`
  }
}

export function durationToToneDurationTime (number) {
  const decimal = number - Math.floor(number)
  const integer = number - decimal

  const decimalToneDuration = durationToToneDuration(decimal)
  const integerToneDuration = durationToToneDuration(integer)

  const decimalToneDurationTime = Tone.Time(decimalToneDuration).toSeconds()
  const integerToneDurationTime = Tone.Time(integerToneDuration).toSeconds()

  return integerToneDurationTime + decimalToneDurationTime
}
