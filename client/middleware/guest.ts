export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuth();

    if (auth.userId) {
        return navigateTo('/dashboard');
    }
});
