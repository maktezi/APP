import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function toasts(message: string, type: any) {
    toast(message, {
        theme: 'auto',
        type: 'success',
        position: 'bottom-right',
        autoClose: 2000,
    });
}
