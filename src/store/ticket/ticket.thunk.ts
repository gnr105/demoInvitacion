import type { AppDispatch } from "../store";
import { toast } from "sonner";

import { setIsLoading, setTicket } from "./ticket.slice"
import { instance } from "@/common/config/http.plugin"
import type { Ticket } from "@/modules/ticket/interfaces/ticket.interface"
import { isAxiosError } from "axios";

export const startGettingTicket = (keyPass: string) => {
    return async (dispatch: AppDispatch): Promise<boolean> => {
        try {
            dispatch(setIsLoading(true))

            const demoKey = import.meta.env.VITE_DEMO_ACCESS_KEY
            let ticket: Ticket

            if (demoKey) {
                if (keyPass.trim().toUpperCase() !== demoKey.trim().toUpperCase()) {
                    toast.error('Clave incorrecta. Verifica tu clave de acceso.')
                    return false
                }

                ticket = {
                    id: 'demo-grethel',
                    name: 'Invitado de demostración',
                    adultsQuantity: 1,
                    adultsCounter: 0,
                    kidsQuantity: 0,
                    kidsCounter: 0,
                    qrCode: '',
                    phone: '',
                    keyPass: demoKey.trim().toUpperCase(),
                    isActive: true,
                    event: 'demo-grethel',
                    user: '',
                    table: '',
                }
            } else {
                const response = await instance.get<Ticket>(`tickets/keyPass/${keyPass}`)
                ticket = response.data
            }

            dispatch(setTicket(ticket))
            localStorage.setItem('abrasa-ticket', JSON.stringify(ticket))
            toast.success(`Bienvenido ${ticket.name}`)
            return true
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error('Boleto no encontrado. Verifica tu clave de acceso.')
                } else {
                    toast.error(error.response?.data?.errors?.[0] ?? 'Ocurrió un error. Intenta de nuevo.')
                }
            }
            return false
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}
