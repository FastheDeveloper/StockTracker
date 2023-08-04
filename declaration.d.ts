type ToastType = import('react-native-toast-notifications').ToastType;

declare global {
  const toast: ToastType;
}

declare var toast: ToastType;

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.pdf';
declare module '*.png';
