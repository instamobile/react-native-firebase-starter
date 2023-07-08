import React, { useMemo, forwardRef } from 'react'
import { SafeAreaView } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import { useTheme } from '../../../theming'
import dynamicStyles from './styles'

const BottomSheet = forwardRef((props, myRef) => {
  const {
    handleSheetChanges,
    animateOnMount,
    handleComponent,
    snapPoints,
    children,
  } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={myRef}
        index={1}
        animateOnMount={animateOnMount}
        containerStyle
        backgroundStyle={styles.background}
        snapPoints={snapPoints ?? ['25%', '50%']}
        handleComponent={handleComponent}
        style={styles.bottomSheet}
        onChange={handleSheetChanges}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
})
export { BottomSheetTextInput, BottomSheet }
