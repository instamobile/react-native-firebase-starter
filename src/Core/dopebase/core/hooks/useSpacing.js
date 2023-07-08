const BASE = 4

export const useSpacing = props => {
  const res = []

  const { style } = props
  style && res.push(style)

  const { fx1, fx2, fx3 } = props
  fx1 && res.push({ flex: 1 })
  fx2 && res.push({ flex: 2 })
  fx3 && res.push({ flex: 3 })

  const { mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8 } = props
  mv1 && res.push({ marginVertical: BASE })
  mv2 && res.push({ marginVertical: 2 * BASE })
  mv3 && res.push({ marginVertical: 3 * BASE })
  mv4 && res.push({ marginVertical: 4 * BASE })
  mv5 && res.push({ marginVertical: 5 * BASE })
  mv6 && res.push({ marginVertical: 6 * BASE })
  mv7 && res.push({ marginVertical: 7 * BASE })
  mv8 && res.push({ marginVertical: 8 * BASE })

  const { mh1, mh2, mh3, mh4, mh5, mh6, mh7, mh8 } = props
  mh1 && res.push({ marginHorizontal: BASE })
  mh2 && res.push({ marginHorizontal: 2 * BASE })
  mh3 && res.push({ marginHorizontal: 3 * BASE })
  mh4 && res.push({ marginHorizontal: 4 * BASE })
  mh5 && res.push({ marginHorizontal: 5 * BASE })
  mh6 && res.push({ marginHorizontal: 6 * BASE })
  mh7 && res.push({ marginHorizontal: 7 * BASE })
  mh8 && res.push({ marginHorizontal: 8 * BASE })

  const { mt1, mt2, mt3, mt4, mt5, mt6, mt7, mt8 } = props
  mt1 && res.push({ marginTop: BASE })
  mt2 && res.push({ marginTop: 2 * BASE })
  mt3 && res.push({ marginTop: 3 * BASE })
  mt4 && res.push({ marginTop: 4 * BASE })
  mt5 && res.push({ marginTop: 5 * BASE })
  mt6 && res.push({ marginTop: 6 * BASE })
  mt7 && res.push({ marginTop: 7 * BASE })
  mt8 && res.push({ marginTop: 8 * BASE })

  const { mb1, mb2, mb3, mb4, mb5, mb6, mb7, mb8 } = props
  mb1 && res.push({ marginBottom: BASE })
  mb2 && res.push({ marginBottom: 2 * BASE })
  mb3 && res.push({ marginBottom: 3 * BASE })
  mb4 && res.push({ marginBottom: 4 * BASE })
  mb5 && res.push({ marginBottom: 5 * BASE })
  mb6 && res.push({ marginBottom: 6 * BASE })
  mb7 && res.push({ marginBottom: 7 * BASE })
  mb8 && res.push({ marginBottom: 8 * BASE })

  const { ml1, ml2, ml3, ml4, ml5, ml6, ml7, ml8 } = props
  ml1 && res.push({ marginLeft: BASE })
  ml2 && res.push({ marginLeft: 2 * BASE })
  ml3 && res.push({ marginLeft: 3 * BASE })
  ml4 && res.push({ marginLeft: 4 * BASE })
  ml5 && res.push({ marginLeft: 5 * BASE })
  ml6 && res.push({ marginLeft: 6 * BASE })
  ml7 && res.push({ marginLeft: 7 * BASE })
  ml8 && res.push({ marginLeft: 8 * BASE })

  const { mr1, mr2, mr3, mr4, mr5, mr6, mr7, mr8 } = props
  mr1 && res.push({ marginRight: BASE })
  mr2 && res.push({ marginRight: 2 * BASE })
  mr3 && res.push({ marginRight: 3 * BASE })
  mr4 && res.push({ marginRight: 4 * BASE })
  mr5 && res.push({ marginRight: 5 * BASE })
  mr6 && res.push({ marginRight: 6 * BASE })
  mr7 && res.push({ marginRight: 7 * BASE })
  mr8 && res.push({ marginRight: 8 * BASE })

  const { pt1, pt2, pt3, pt4, pt5, pt6, pt7, pt8 } = props
  pt1 && res.push({ paddingTop: BASE })
  pt2 && res.push({ paddingTop: 2 * BASE })
  pt3 && res.push({ paddingTop: 3 * BASE })
  pt4 && res.push({ paddingTop: 4 * BASE })
  pt5 && res.push({ paddingTop: 5 * BASE })
  pt6 && res.push({ paddingTop: 6 * BASE })
  pt7 && res.push({ paddingTop: 7 * BASE })
  pt8 && res.push({ paddingTop: 8 * BASE })

  const { pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8 } = props
  pb1 && res.push({ paddingBottom: BASE })
  pb2 && res.push({ paddingBottom: 2 * BASE })
  pb3 && res.push({ paddingBottom: 3 * BASE })
  pb4 && res.push({ paddingBottom: 4 * BASE })
  pb5 && res.push({ paddingBottom: 5 * BASE })
  pb6 && res.push({ paddingBottom: 6 * BASE })
  pb7 && res.push({ paddingBottom: 7 * BASE })
  pb8 && res.push({ paddingBottom: 8 * BASE })

  const { pl1, pl2, pl3, pl4, pl5, pl6, pl7, pl8 } = props
  pl1 && res.push({ paddingLeft: BASE })
  pl2 && res.push({ paddingLeft: 2 * BASE })
  pl3 && res.push({ paddingLeft: 3 * BASE })
  pl4 && res.push({ paddingLeft: 4 * BASE })
  pl5 && res.push({ paddingLeft: 5 * BASE })
  pl6 && res.push({ paddingLeft: 6 * BASE })
  pl7 && res.push({ paddingLeft: 7 * BASE })
  pl8 && res.push({ paddingLeft: 8 * BASE })

  const { pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8 } = props
  pr1 && res.push({ paddingRight: BASE })
  pr2 && res.push({ paddingRight: 2 * BASE })
  pr3 && res.push({ paddingRight: 3 * BASE })
  pr4 && res.push({ paddingRight: 4 * BASE })
  pr5 && res.push({ paddingRight: 5 * BASE })
  pr6 && res.push({ paddingRight: 6 * BASE })
  pr7 && res.push({ paddingRight: 7 * BASE })
  pr8 && res.push({ paddingRight: 8 * BASE })

  const { br1, br2, br3, br4, br5, br6, br7, br8 } = props
  br1 && res.push({ borderRadius: BASE })
  br2 && res.push({ borderRadius: 2 * BASE })
  br3 && res.push({ borderRadius: 3 * BASE })
  br4 && res.push({ borderRadius: 4 * BASE })
  br5 && res.push({ borderRadius: 5 * BASE })
  br6 && res.push({ borderRadius: 6 * BASE })
  br7 && res.push({ borderRadius: 7 * BASE })
  br8 && res.push({ borderRadius: 8 * BASE })

  return res
}
