import { AuthProvider } from "./AuthContext"
import { EventProvider } from "./EventsContext"

const Providers = ({children}) => {
    return (
        <AuthProvider>
            <EventProvider>
                {children}
            </EventProvider>
        </AuthProvider>
    )
}

export default Providers;