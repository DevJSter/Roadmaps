import Cookies from 'js-cookie';
import { handleAuthRequired } from '../Authenticator/authenticator';
import {TOKEN_COOKIE_NAME} from "../../lib/jwt";

export function logout() {
  Cookies.remove(TOKEN_COOKIE_NAME);
  // Reloading will automatically redirect the user if required
  window.location.reload();
}

function bindEvents() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const dataset = {
      ...target.dataset,
      ...target.closest('button')?.dataset,
    };

    // If the user clicks on the logout button, remove the token cookie
    if (dataset.logoutButton !== undefined) {
      logout();
    } else if (dataset.showMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.remove('hidden');
    } else if (dataset.closeMobileNav !== undefined) {
      document.querySelector('[data-mobile-nav]')?.classList.add('hidden');
    }
  });

  document
    .querySelector('[data-account-button]')
    ?.addEventListener('click', (e) => {
      e.stopPropagation();
      document
        .querySelector('[data-account-dropdown]')
        ?.classList.toggle('hidden');
    });
}

bindEvents();
