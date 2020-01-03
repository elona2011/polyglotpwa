const colors = ['YellowGreen', 'Wheat', 'Tomato', 'Tan', 'SteelBlue', 'SlateBlue', 'Salmon', 'Purple', 'PaleVioletRed', 'MediumSeaGreen', 'SpringGreen', 'SkyBlue', 'Orange']

export const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}