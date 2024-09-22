export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuth();
    const noAuthRoutes = ['index', 'login', 'register'];

    if (!auth.userId) {
        if (!noAuthRoutes.includes(to.name ?? '')) {
            return navigateTo('/login');
        }
    } else {
        if (noAuthRoutes.includes(to.name ?? '')) {
            return navigateTo('/dashboard');
        }
    }
});
