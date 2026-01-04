import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonAlert
} from '@ionic/react';
import './CarCard.css';
import { useState } from 'react';
import { Car } from './CarContext';

interface CarCardProps {
    car: Car;
    onClick: () => void;
    onDelete?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick, onDelete }) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const remainingOil = car.limiteAceite - (car.kilometraje - car.ultimoAceite);
    const remainingBattery = car.limiteBateria - (car.kilometraje - car.ultimaBateria);

    const getOilStatus = () => {
        if (remainingOil > 2000) return { text: 'good', label: `${remainingOil} km` };
        if (remainingOil > 500) return { text: 'warning', label: `${remainingOil} km` };
        return { text: 'danger', label: '⚠️ Requiere cambio' };
    };

    const getBatteryStatus = () => {
        if (remainingBattery > 10000) return { text: 'good', label: `${remainingBattery} km` };
        if (remainingBattery > 2000) return { text: 'warning', label: `${remainingBattery} km` };
        return { text: 'danger', label: '⚠️ Requiere cambio' };
    };

    const oilStatus = getOilStatus();
    const batteryStatus = getBatteryStatus();

    return (
        <IonCard className="car-card">
            <IonCardHeader>
                <IonCardTitle>
                    <IonIcon icon="car" style={{ marginRight: '8px' }} />
                    {car.marca} {car.modelo}
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <div className="car-info">
                    <p><strong>Placa:</strong> {car.placa}</p>
                    <p><strong>Kilometraje:</strong> {car.kilometraje.toLocaleString()} km</p>

                    <div className="status-indicators">
                        <span className={`status-dot ${oilStatus.text}`}></span>
                        <IonIcon icon="water" size="small" />
                        <span>Aceite: {oilStatus.label}</span>
                    </div>

                    <div className="status-indicators">
                        <span className={`status-dot ${batteryStatus.text}`}></span>
                        <IonIcon icon="battery-half" size="small" />
                        <span>Batería: {batteryStatus.label}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <IonButton
                        expand="block"
                        onClick={onClick}
                        style={{ flex: 1 }}
                    >
                        Ver detalles
                    </IonButton>
                    <IonButton
                        expand="block"
                        color="danger"
                        onClick={() => setShowDeleteAlert(true)}
                        style={{ flex: 1 }}
                    >
                        Eliminar
                    </IonButton>
                </div>
            </IonCardContent>

            {/* ALERTA DENTRO DEL CARD - Esto soluciona el problema */}
            <IonAlert
                isOpen={showDeleteAlert}
                onDidDismiss={() => setShowDeleteAlert(false)}
                header="Eliminar vehículo"
                message={`¿Estás seguro de eliminar ${car.marca} ${car.modelo}?`}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        handler: () => {
                            if (onDelete) {
                                onDelete();
                            }
                        }
                    }
                ]}
            />
        </IonCard>
    );
};

export default CarCard;