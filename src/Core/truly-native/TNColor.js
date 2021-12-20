import invert from 'invert-color'

const TNColor = hexStringColor => {
  return invert(hexStringColor)
}
// const TNColor = hexStringColor => {
//   const colorScheme = Appearance.getColorScheme();
//   if (colorScheme === 'dark') {
//     return invert(hexStringColor);
//   }
//   return hexStringColor;
// };
export default TNColor
