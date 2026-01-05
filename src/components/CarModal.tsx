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
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonNote,
} from '@ionic/react';
import { useState } from 'react';
import './CarModal.css';
import { Car } from './CarContext';
import { batteryHalf, close, flag, list, speedometer, water } from 'ionicons/icons';

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
    const nextOilAt = car.ultimoAceite + car.limiteAceite;
    const nextBatteryAt = car.ultimaBateria + car.limiteBateria;
    const nextServiceAt = Math.min(nextOilAt, nextBatteryAt);
    const nextServiceType = nextOilAt <= nextBatteryAt ? 'Aceite' : 'Batería';

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
                <IonToolbar className="car-modal__toolbar">
                    <IonTitle>{car.marca} {car.modelo}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose} fill="clear" color="medium" className="car-modal__closeBtn">
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="car-modal__content">
                {/* Selector de sección */}
                <IonSegment
                    className="car-modal__segment"
                    value={segment}
                    onIonChange={e => onSegmentChange(e.detail.value as any)}
                >
                    <IonSegmentButton value="dashboard">
                        <IonIcon icon={speedometer} />
                        <IonLabel>Dashboard</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="registro">
                        <IonIcon icon={water} />
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

                        <IonGrid className="car-dashboard">
                            <IonRow>
                                <IonCol size="12" sizeMd="6">
                                    <IonCard className="car-dashboard__statCard car-dashboard__statCard--primary">
                                        <IonCardContent className="car-dashboard__statCardContent">
                                            <div className="car-dashboard__statTop">
                                                <div className="car-dashboard__iconWrap">
                                                    <IonIcon icon={speedometer} className="car-dashboard__statIcon" />
                                                </div>
                                                <div className="car-dashboard__statText">
                                                    <div className="car-dashboard__statLabel">Kilometraje</div>
                                                    <div className="car-dashboard__statMeta">km totales</div>
                                                </div>
                                            </div>
                                            <div className="car-dashboard__statValue">{car.kilometraje.toLocaleString()}</div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>

                                <IonCol size="12" sizeMd="6">
                                    <IonCard className="car-dashboard__statCard car-dashboard__statCard--warning">
                                        <IonCardContent className="car-dashboard__statCardContent">
                                            <div className="car-dashboard__statTop">
                                                <div className="car-dashboard__iconWrap">
                                                    <IonIcon icon={water} className="car-dashboard__statIcon" />
                                                </div>
                                                <div className="car-dashboard__statText">
                                                    <div className="car-dashboard__statLabel">Aceite</div>
                                                    <div className="car-dashboard__statMeta">km restantes</div>
                                                </div>
                                            </div>
                                            <div className="car-dashboard__statValue">{remainingOil.toLocaleString()}</div>
                                            <div className="car-dashboard__badgeRow">
                                                <IonBadge color={getOilColor()}>Próximo: {nextOilAt.toLocaleString()} km</IonBadge>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>

                                <IonCol size="12" sizeMd="6">
                                    <IonCard className="car-dashboard__statCard car-dashboard__statCard--tertiary">
                                        <IonCardContent className="car-dashboard__statCardContent">
                                            <div className="car-dashboard__statTop">
                                                <div className="car-dashboard__iconWrap">
                                                    <IonIcon icon={batteryHalf} className="car-dashboard__statIcon" />
                                                </div>
                                                <div className="car-dashboard__statText">
                                                    <div className="car-dashboard__statLabel">Batería</div>
                                                    <div className="car-dashboard__statMeta">km restantes</div>
                                                </div>
                                            </div>
                                            <div className="car-dashboard__statValue">{remainingBattery.toLocaleString()}</div>
                                            <div className="car-dashboard__badgeRow">
                                                <IonBadge color={getBatteryColor()}>
                                                    Próximo: {nextBatteryAt.toLocaleString()} km
                                                </IonBadge>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>

                                <IonCol size="12" sizeMd="6">
                                    <IonCard className="car-dashboard__statCard car-dashboard__statCard--success">
                                        <IonCardContent className="car-dashboard__statCardContent">
                                            <div className="car-dashboard__statTop">
                                                <div className="car-dashboard__iconWrap">
                                                    <IonIcon icon={list} className="car-dashboard__statIcon" />
                                                </div>
                                                <div className="car-dashboard__statText">
                                                    <div className="car-dashboard__statLabel">Próximo</div>
                                                    <div className="car-dashboard__statMeta">{nextServiceType}</div>
                                                </div>
                                            </div>
                                            <div className="car-dashboard__statValue">{nextServiceAt.toLocaleString()}</div>
                                            <div className="car-dashboard__statMeta">km</div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>

                            <IonRow className="car-dashboard__sectionRow">
                                <IonCol size="12">
                                    <div className="car-dashboard__sectionTitle">Actividad Reciente</div>
                                    <IonList inset lines="none" className="car-dashboard__activityList">
                                        <IonItem lines="none" className="car-dashboard__activityItem">
                                            <IonIcon icon={water} slot="start" className="car-dashboard__activityIcon" />
                                            <IonLabel>
                                                <h2>Último cambio de aceite</h2>
                                                <p>{car.ultimoAceite.toLocaleString()} km</p>
                                            </IonLabel>
                                            <IonNote slot="end">Aceite</IonNote>
                                        </IonItem>
                                        <IonItem lines="none" className="car-dashboard__activityItem">
                                            <IonIcon icon={batteryHalf} slot="start" className="car-dashboard__activityIcon" />
                                            <IonLabel>
                                                <h2>Último cambio de batería</h2>
                                                <p>{car.ultimaBateria.toLocaleString()} km</p>
                                            </IonLabel>
                                            <IonNote slot="end">Batería</IonNote>
                                        </IonItem>
                                        <IonItem lines="none" className="car-dashboard__activityItem">
                                            <IonIcon icon={list} slot="start" className="car-dashboard__activityIcon" />
                                            <IonLabel>
                                                <h2>Próximo mantenimiento</h2>
                                                <p>{nextServiceAt.toLocaleString()} km ({nextServiceType})</p>
                                            </IonLabel>
                                            <IonNote slot="end">Recomendado</IonNote>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                )}

                {/* REGISTRO */}
                {segment === 'registro' && (
                    <div className="register-content">
                        <h3>Registrar nueva información</h3>

                        <IonItem className="input-item">
                            <IonLabel position="stacked">
                                <IonIcon icon={speedometer} style={{ marginRight: '8px' }} />
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
                                shape="round"
                                onClick={() => {
                                    onRegisterKm(nuevoKm);
                                    setNuevoKm(0);
                                }}
                                disabled={nuevoKm <= 0}
                            >
                                <IonIcon icon={flag} slot="start" />
                                Registrar kilometraje
                            </IonButton>

                            <IonButton
                                expand="block"
                                shape="round"
                                color="warning"
                                onClick={onChangeOil}
                                className="maintenance-button"
                            >
                                <IonIcon icon={water} slot="start" />
                                Cambié aceite (restablecer contador)
                            </IonButton>

                            <IonButton
                                expand="block"
                                shape="round"
                                color="tertiary"
                                onClick={onChangeBattery}
                                className="maintenance-button"
                            >
                                <IonIcon icon={batteryHalf} slot="start" />
                                Cambié batería (restablecer contador)
                            </IonButton>
                        </div>
                    </div>
                )}
                <div className="car-modal__footer">
                    <IonButton expand="block" shape="round" fill="outline" color="medium" onClick={onClose}>
                        Cerrar
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default CarModal;