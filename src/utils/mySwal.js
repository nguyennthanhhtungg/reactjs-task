import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function Loading() {
  return MySwal.fire({
    title: 'Please Wait !',
    html: 'Loading...',
    timer: 5000,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      MySwal.showLoading();
    }
  });
}

export function AddToCart() {
  return Swal.fire({
    icon: 'success',
    titleText: 'This Product has been added to Cart!',
    showConfirmButton: false,
    width: 600,
    timer: 1500
  });
}

export function PlaceOrder() {
  return Swal.fire({
    icon: 'success',
    titleText: 'Place order successfully!',
    showConfirmButton: false,
    width: 400,
    timer: 1500
  });
}

export function Close() {
  return MySwal.close();
}
