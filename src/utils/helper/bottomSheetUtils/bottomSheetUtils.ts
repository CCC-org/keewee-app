import {
  BottomSheetModalMethods,
  BottomSheetMethods,
} from '@gorhom/bottom-sheet/lib/typescript/types';
import { RefObject, useEffect } from 'react';
import { BackHandler } from 'react-native';
/**
 * @description This function is used to close the modal when the Android hardware back button is pressed
 * @param {BottomSheetModal} modalRef - BottomSheet Element Reference that has close method
 */
export function backButtonModalClose(
  ...modalRefs: RefObject<BottomSheetModalMethods>[] | RefObject<BottomSheetMethods>[]
) {
  useEffect(() => {
    const backAction = () => {
      modalRefs.forEach((modalRef) => {
        console.log('ref:', modalRef);
        modalRef.current?.snapToPosition(-1);
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
}
export const handleSheetPresent = (Ref: React.RefObject<BottomSheetModalMethods>) => {
  Ref.current?.present();
};

export const handleSheetClose = (Ref: React.RefObject<BottomSheetModalMethods>) => {
  Ref.current?.close();
};
