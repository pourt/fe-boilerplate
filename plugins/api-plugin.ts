import Api from '~/utils/api';

export default defineNuxtPlugin(async (nuxtApp) => {
  Api.init(nuxtApp.vueApp);
});
