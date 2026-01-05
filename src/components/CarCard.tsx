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
                <IonCardTitle className="car-card__title">
                    <span className="car-card__titleIcon">
                        <IonIcon icon="car" />
                    </span>
                    <span className="car-card__titleText">{car.marca} {car.modelo}</span>
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <div className="car-info car-card__info">
                    <div className="car-card__meta">
                        <div className="car-card__metaRow">
                            <div className="car-card__metaLabel">Placa</div>
                            <div className="car-card__metaValue">{car.placa}</div>
                        </div>
                        <div className="car-card__metaRow">
                            <div className="car-card__metaLabel">Kilometraje</div>
                            <div className="car-card__metaValue">{car.kilometraje.toLocaleString()} km</div>
                        </div>
                    </div>

                    <div className="car-card__statusGrid">
                        <div className="car-card__statusPill">
                            <span className={`status-dot ${oilStatus.text}`}></span>
                            <IonIcon icon="water" />
                            <span className="car-card__statusText">Aceite: {oilStatus.label}</span>
                        </div>
                        <div className="car-card__statusPill">
                            <span className={`status-dot ${batteryStatus.text}`}></span>
                            <IonIcon icon="battery-half" />
                            <span className="car-card__statusText">Batería: {batteryStatus.label}</span>
                        </div>
                    </div>
                </div>

                <div className="car-card__actions">
                    <IonButton
                        expand="block"
                        shape="round"
                        onClick={onClick}
                        className="car-card__btn car-card__btn--primary"
                    >
                        Ver detalles
                    </IonButton>
                    <IonButton
                        expand="block"
                        shape="round"
                        fill="outline"
                        color="danger"
                        onClick={() => setShowDeleteAlert(true)}
                        className="car-card__btn car-card__btn--danger"
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