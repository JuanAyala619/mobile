import {
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import { useState } from 'react';
import './CarModal.css';
import { Car } from './CarContext';

interface CarModalProps {
    isOpen: boolean;
    car: Car | null;
    segment: 'dashboard' | 'registro';
    onSegmentChange: (segment: 'dashboard' | 'registro') => void;
    onClose: () => void;
    onRegisterKm: (km: number) => void;
    onChangeOil: () => void;
    onChangeBattery: () => void;
}

const CarModal: React.FC<CarModalProps> = ({
    isOpen,
    car,
    segment,
    onSegmentChange,
    onClose,
    onRegisterKm,
    onChangeOil,
    onChangeBattery,
}) => {
    const [nuevoKm, setNuevoKm] = useState<number>(0);

    if (!car) return null;

    const remainingOil = Math.max(0, car.limiteAceite - (car.kilometraje - car.ultimoAceite));
    const remainingBattery = Math.max(0, car.limiteBateria - (car.kilometraje - car.ultimaBateria));

    const getOilColor = () => {
        if (remainingOil > 2000) return 'success';
        if (remainingOil > 500) return 'warning';
        return 'danger';
    };

    const getBatteryColor = () => {
        if (remainingBattery > 10000) return 'success';
        if (remainingBattery > 2000) return 'warning';
        return 'danger';
    };

    return (
        <IonModal isOpen={isOpen} className="car-modal">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>{car.marca} {car.modelo}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon icon="close" />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {/* Selector de sección */}
                <IonSegment
                    value={segment}
                    onIonChange={e => onSegmentChange(e.detail.value as any)}
                >
                    <IonSegmentButton value="dashboard">
                        <IonIcon icon="speedometer" />
                        <IonLabel>Dashboard</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="registro">
                        <IonIcon icon="water" />
                        <IonLabel>Registro</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {/* DASHBOARD */}
                {segment === 'dashboard' && (
                    <div className="dashboard-content">
                        <div className="car-header">
                            <h2>{car.placa}</h2>
                            <p className="total-km">{car.kilometraje.toLocaleString()} km totales</p>
                        </div>

                        <IonGrid className="metrics-grid">
                            <IonRow>
                                <IonCol size="6">
                                    <div className="metric-card oil-card">
                                        <IonIcon icon="water" size="large" color="warning" />
                                        <h3>Aceite</h3>
                                        <IonBadge color={getOilColor()}>
                                            {remainingOil.toLocaleString()} km restantes
                                        </IonBadge>
                                        <p className="next-change">
                                            Próximo cambio: {(car.ultimoAceite + car.limiteAceite).toLocaleString()} km
                                        </p>
                                    </div>
                                </IonCol>

                                <IonCol size="6">
                                    <div className="metric-card battery-card">
                                        <IonIcon icon="battery-half" size="large" color="tertiary" />
                                        <h3>Batería</h3>
                                        <IonBadge color={getBatteryColor()}>
                                            {remainingBattery.toLocaleString()} km restantes
                                        </IonBadge>
                                        <p className="next-change">
                                            Próximo cambio: {(car.ultimaBateria + car.limiteBateria).toLocaleString()} km
                                        </p>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        <div className="maintenance-history">
                            <h3>
                                <IonIcon icon="list" style={{ marginRight: '8px' }} />
                                Historial de mantenimiento
                            </h3>
                            <div className="history-item">
                                <IonIcon icon="water" />
                                <div>
                                    <strong>Último cambio de aceite:</strong>
                                    <p>{car.ultimoAceite.toLocaleString()} km</p>
                                </div>
                            </div>
                            <div className="history-item">
                                <IonIcon icon="battery-half" />
                                <div>
                                    <strong>Último cambio de batería:</strong>
                                    <p>{car.ultimaBateria.toLocaleString()} km</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* REGISTRO */}
                {segment === 'registro' && (
                    <div className="register-content">
                        <h3>Registrar nueva información</h3>

                        <IonItem className="input-item">
                            <IonLabel position="stacked">
                                <IonIcon icon="speedometer" style={{ marginRight: '8px' }} />
                                Kilometraje nuevo (km)
                            </IonLabel>
                            <IonInput
                                type="number"
                                value={nuevoKm}
                                placeholder="Ej: 150"
                                onIonChange={e => setNuevoKm(Number(e.detail.value) || 0)}
                            />
                        </IonItem>

                        <div className="action-buttons">
                            <IonButton
                                expand="block"
                                onClick={() => {
                                    onRegisterKm(nuevoKm);
                                    setNuevoKm(0);
                                }}
                                disabled={nuevoKm <= 0}
                            >
                                <IonIcon icon="flag" slot="start" />
                                Registrar kilometraje
                            </IonButton>

                            <IonButton
                                expand="block"
                                color="warning"
                                onClick={onChangeOil}
                                className="maintenance-button"
                            >
                                <IonIcon icon="water" slot="start" />
                                Cambié aceite (restablecer contador)
                            </IonButton>

                            <IonButton
                                expand="block"
                                color="tertiary"
                                onClick={onChangeBattery}
                                className="maintenance-button"
                            >
                                <IonIcon icon="battery-half" slot="start" />
                                Cambié batería (restablecer contador)
                            </IonButton>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <IonButton expand="block" color="medium" onClick={onClose}>
                        Cerrar
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default CarModal;