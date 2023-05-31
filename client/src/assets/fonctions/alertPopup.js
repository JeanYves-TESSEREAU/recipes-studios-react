import Swal from 'sweetalert2';

export const alertPopup = (message, type) =>
  Swal.fire({
    position: 'top',
    // showClass: {
    //   popup: 'animated fadeInDown slower',
    //   icon: 'animated heartBeat delay-2',
    // },
    // hideClass: {
    //   popup: 'animated fadeOutUp slower',
    // },

    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2500,
  });

export const alertGoToRecipeBook = () => {
  Swal.fire({
    title: 'Tu veux aller voir ta recette toute fraîche ?',
    showDenyButton: true,
    confirmButtonText: 'GO!',
    denyButtonText: `non, merci.`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('yesss!', '', 'success');
      localStorage.setItem('goToRecipeBook', true);
      setTimeout(() => {
        localStorage.setItem('goToRecipeBook', false);
      }, 1000);
    } else if (result.isDenied) {
      Swal.fire('comme tu voudras', '', 'success');
      localStorage.setItem('goToRecipeBook', false);
    }
  });
};
