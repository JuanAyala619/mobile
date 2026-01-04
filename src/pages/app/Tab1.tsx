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
} from '@ionic/react';
import { useState } from 'react';
import CarCard from '../../components/CarCard';
import CarModal from '../../components/CarModal';
import { useCarContext } from '../../components/CarContext';
import './Tab1.css';

const Tab1: React.FC = () => {
  const { cars, updateCarKm, changeOil, changeBattery, deleteCar } = useCarContext();
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [segment, setSegment] = useState<'dashboard' | 'registro'>('dashboard');

  const modalIsOpen = selectedCar !== null;
  const selectedCarData = cars.find(car => car.id === selectedCar) || null;

  const cerrarModal = () => {
    setSelectedCar(null);
    setSegment('dashboard');
  };

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
            <IonText color="medium">
              <h2>No hay coches registrados</h2>
              <p>Vaya a la sección "Registrar" para agregar tu primer coche</p>
            </IonText>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {cars.map(car => (
                <IonCol size="12" size-md="6" key={car.id}>
                  <CarCard
                    car={car}
                    onClick={() => setSelectedCar(car.id)}
                    onDelete={() => {
                      deleteCar(car.id);
                      if (selectedCar === car.id) {
                        cerrarModal();
                      }
                    }}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        <CarModal
          isOpen={modalIsOpen}
          car={selectedCarData}
          segment={segment}
          onSegmentChange={setSegment}
          onClose={cerrarModal}
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