import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react';
import { useState } from 'react';
import { Car } from '../App';

interface Tab2Props {
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

const Tab2: React.FC<Tab2Props> = ({ setCars }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [limiteAceite, setLimiteAceite] = useState<number>(0);
  const [limiteBateria, setLimiteBateria] = useState<number>(0);

  const guardar = () => {
    const nuevo: Car = {
      id: Date.now(),
      marca: marca,
      modelo: modelo,
      placa: placa,
      kilometraje: 0,
      ultimoAceite: 0,
      ultimaBateria: 0,
      limiteAceite: limiteAceite,
      limiteBateria: limiteBateria
    };

    setCars(prev => [...prev, nuevo]);

    setMarca('');
    setModelo('');
    setPlaca('');
    setLimiteAceite(0);
    setLimiteBateria(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar coche</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="stacked">Marca</IonLabel>
          <IonInput value={marca} onIonChange={e => setMarca(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Modelo</IonLabel>
          <IonInput value={modelo} onIonChange={e => setModelo(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Placa</IonLabel>
          <IonInput value={placa} onIonChange={e => setPlaca(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Km cambio de aceite</IonLabel>
          <IonInput
            type="number"
            value={limiteAceite}
            onIonChange={e => setLimiteAceite(Number(e.detail.value))}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Km cambio de batería</IonLabel>
          <IonInput
            type="number"
            value={limiteBateria}
            onIonChange={e => setLimiteBateria(Number(e.detail.value))}
          />
        </IonItem>

        <IonButton expand="block" onClick={guardar}>
          Guardar coche
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
