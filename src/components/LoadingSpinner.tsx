import { IonSpinner, IonContent, IonPage, IonText } from '@ionic/react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <IonPage>
            <IonContent className="ion-padding" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <IonSpinner name="crescent" style={{ width: '64px', height: '64px' }} />
                {message && (
                    <IonText color="medium" style={{ marginTop: '16px' }}>
                        <p>{message}</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default LoadingSpinner;