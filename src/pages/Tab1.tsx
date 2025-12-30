import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import CarCard from '../components/CarCard';
import CarModal from '../components/CarModal';
import { useCarContext } from '../components/CarContext';
import './Tab1.css';

const Tab1: React.FC = () => {
  const { cars, updateCarKm, changeOil, changeBattery } = useCarContext();
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [segment, setSegment] = useState<'dashboard' | 'registro'>('dashboard');

  const cerrar = () => {
    setSelectedCar(null);
    setSegment('dashboard');
  };

  const modalIsOpen = selectedCar !== null;
  const selectedCarData = cars.find(car => car.id === selectedCar) || null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mi Garaje</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cars.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={add} size="large" />
            <IonText color="medium">
              <h2>No hay coches registrados</h2>
              <p>Presiona el botón + para agregar tu primer coche</p>
            </IonText>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {cars.map(car => {
                return (
                  <IonCol size="12" size-md="6" key={car.id}>
                    <CarCard
                      car={car}
                      onClick={() => setSelectedCar(car.id)}
                    />
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        )}

        <CarModal
          isOpen={modalIsOpen}
          car={selectedCarData}
          segment={segment}
          onSegmentChange={setSegment}
          onClose={cerrar}
          onRegisterKm={(km) => {
            if (selectedCar) {
              updateCarKm(selectedCar, km);
            }
          }}
          onChangeOil={() => {
            if (selectedCar) {
              changeOil(selectedCar);
            }
          }}
          onChangeBattery={() => {
            if (selectedCar) {
              changeBattery(selectedCar);
            }
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;