const colors = ['YellowGreen', 'Wheat', 'Tomato', 'Tan', 'SteelBlue', 'SlateBlue', 'Salmon', 'Purple', 'PaleVioletRed', 'MediumSeaGreen', 'SpringGreen', 'SkyBlue', 'Orange']

export const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}
export const getRotateZ = () => {
  let num = Math.floor(Math.random() * 180)
  return `rotateZ(${num}deg)`
}
export const getFontSize = val => {
  if (val && val.length == 1) {
    return 15 + Math.floor(Math.random() * 60) + "vw";
  } else {
    return "10vw"
  }
}