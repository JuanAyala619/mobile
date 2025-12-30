import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';

import { useState } from 'react';
import { Car } from '../App';

interface Tab1Props {
  cars: Car[];
}

const Tab1: React.FC<Tab1Props> = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [segment, setSegment] = useState<'dashboard' | 'registro'>('dashboard');
  const [nuevoKm, setNuevoKm] = useState<number>(0);

  const cerrar = () => {
    setSelectedCar(null);
    setSegment('dashboard');
    setNuevoKm(0);
  };

  const registrarKm = () => {
    if (!selectedCar) return;
    selectedCar.kilometraje += nuevoKm;
    setNuevoKm(0);
  };

  const cambiarAceite = () => {
    if (!selectedCar) return;
    selectedCar.ultimoAceite = selectedCar.kilometraje;
  };

  const cambiarBateria = () => {
    if (!selectedCar) return;
    selectedCar.ultimaBateria = selectedCar.kilometraje;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis coches</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {cars.length === 0 && (
          <IonText color="medium">
            <p>No hay coches registrados</p>
          </IonText>
        )}

        {cars.map(car => (
          <IonButton
            key={car.id}
            expand="block"
            onClick={() => setSelectedCar(car)}
          >
            {car.marca} {car.modelo} ({car.placa})
          </IonButton>
        ))}

        <IonModal isOpen={!!selectedCar} onDidDismiss={cerrar}>
          {selectedCar && (
            <IonContent className="ion-padding">

              {/* Selector de sección */}
              <IonSegment
                value={segment}
                onIonChange={e => setSegment(e.detail.value as any)}
              >
                <IonSegmentButton value="dashboard">
                  Dashboard
                </IonSegmentButton>
                <IonSegmentButton value="registro">
                  Registro
                </IonSegmentButton>
              </IonSegment>

              {/* DASHBOARD */}
              {segment === 'dashboard' && (
                <IonText>
                  <h2>{selectedCar.marca} {selectedCar.modelo}</h2>
                  <p><b>Placa:</b> {selectedCar.placa}</p>
                  <p><b>Kilometraje:</b> {selectedCar.kilometraje} km</p>

                  <p>
                    <b>Aceite restante:</b>{' '}
                    {selectedCar.limiteAceite -
                      (selectedCar.kilometraje - selectedCar.ultimoAceite)} km
                  </p>

                  <p>
                    <b>Batería restante:</b>{' '}
                    {selectedCar.limiteBateria -
                      (selectedCar.kilometraje - selectedCar.ultimaBateria)} km
                  </p>
                </IonText>
              )}

              {/* REGISTRO */}
              {segment === 'registro' && (
                <>
                  <IonItem>
                    <IonLabel position="stacked">Kilometraje nuevo</IonLabel>
                    <IonInput
                      type="number"
                      value={nuevoKm}
                      onIonChange={e => setNuevoKm(Number(e.detail.value))}
                    />
                  </IonItem>

                  <IonButton expand="block" onClick={registrarKm}>
                    Registrar kilometraje
                  </IonButton>

                  <IonButton expand="block" color="warning" onClick={cambiarAceite}>
                    Cambié aceite
                  </IonButton>

                  <IonButton expand="block" color="tertiary" onClick={cambiarBateria}>
                    Cambié batería
                  </IonButton>
                </>
              )}

              <IonButton expand="block" color="medium" onClick={cerrar}>
                Cerrar
              </IonButton>

            </IonContent>
          )}
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
