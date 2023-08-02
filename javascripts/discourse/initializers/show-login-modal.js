import { withPluginApi } from 'discourse/lib/plugin-api';
import showModal from 'discourse/lib/show-modal';

export default {
  name: 'show-login-modal',

  initialize(container) {
    withPluginApi('0.8', (api) => {
      const user = container.lookup('service:current-user');

      if (user) {
        return;
      } // must not be logged in

      let shownLoginOnce = false;

      api.onPageChange(() => {
        let pageView = 1;
        pageView++;
        const showLogin = pageView && !shownLoginOnce;
        if (showLogin) {
          shownLoginOnce = true;
          showModal('login', {
            modalClass: 'login',
          });
        }
      });
    });
  },
};
