export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  const router = useRouter();

  if (userStore.user) {
    router.push({ name: 'dashboard' });
  }
});
