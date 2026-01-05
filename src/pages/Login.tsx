import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
} from '@ionic/react';
import { personOutline, lockClosedOutline, carOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = await login(username, password);
            if (success) {
                history.push('/app/tab1');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            setError('Error al iniciar sesión');
        }
    };

    const handleDemoLogin = async () => {
        setUsername('');
        setPassword('');

        setTimeout(async () => {
            const success = await login('demo', 'demo123');
            if (success) {
                history.push('/app/tab1');
            }
        }, 500);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Mi Garaje App</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding login-content">
                <IonGrid className="ion-no-padding">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <div className="login-logo">
                                <IonIcon icon={carOutline} className="logo-icon" />
                                <h1>Mi Garaje</h1>
                                <IonText color="light">
                                    <p>Controla el mantenimiento de tus vehículos</p>
                                </IonText>
                            </div>

                            <form onSubmit={handleLogin}>
                                {error && (
                                    <div className="error-message">
                                        <IonText color="white">
                                            <p>{error}</p>
                                        </IonText>
                                    </div>
                                )}

                                <IonItem className="login-input">
                                    <IonIcon icon={personOutline} slot="start" />
                                    <IonLabel position="floating">Usuario</IonLabel>
                                    <IonInput
                                        value={username}
                                        onIonChange={e => setUsername(e.detail.value || '')}
                                        placeholder="Ingresa tu usuario"
                                        required
                                    />
                                </IonItem>

                                <IonItem className="login-input">
                                    <IonIcon icon={lockClosedOutline} slot="start" />
                                    <IonLabel position="floating">Contraseña</IonLabel>
                                    <IonInput
                                        type="password"
                                        value={password}
                                        onIonChange={e => setPassword(e.detail.value || '')}
                                        placeholder="Ingresa tu contraseña"
                                        required
                                    />
                                </IonItem>
                                
                                <IonText color="light" style={{
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    marginTop: '-8px',
                                    marginBottom: '16px',
                                    display: 'block',
                                    opacity: 0.6
                                }}>
                                    <p>Usa: demo / demo123</p>
                                </IonText>
                                <IonButton
                                    expand="block"
                                    type="submit"
                                    className="login-button"
                                >
                                    Iniciar Sesión
                                </IonButton>

                                <div className="divider">
                                    <span>o</span>
                                </div>

                                <IonButton
                                    expand="block"
                                    color="light"
                                    fill="outline"
                                    onClick={handleDemoLogin}
                                    className="demo-button"
                                >
                                    <IonIcon icon={carOutline} slot="start" />
                                    Probar versión demo
                                </IonButton>

                                <div className="login-footer">
                                    <IonText color="light">
                                        <small>Versión 1.0 • Para uso personal</small>
                                    </IonText>
                                </div>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;