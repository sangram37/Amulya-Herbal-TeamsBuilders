import ToastMessage from '../ToastMessage';

export const Toast = (text, type, position) => {
  ToastMessage({
    position: 'top' || position,
    time: 3000,
    type: type,
    text: text,
  });
};

// 'type_warning'
// 'type_green'
// 'type_danger'
// 'success'
