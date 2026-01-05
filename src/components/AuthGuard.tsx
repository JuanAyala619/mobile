import { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const history = useHistory();

    useEffect(() => {
        const checkAuth = () => {
            const loggedIn = localStorage.getItem('isLoggedIn');
            const authStatus = loggedIn === 'true';
            setIsAuthenticated(authStatus);

            if (!authStatus) {
                history.push('/login');
            }
        };

        checkAuth();
    }, [history]);

    if (isAuthenticated === null) {
        return <LoadingSpinner message="Verificando autenticación..." />;
    }

    if (isAuthenticated === false) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;