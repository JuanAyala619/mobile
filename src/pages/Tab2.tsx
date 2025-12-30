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
import { useCarContext } from '../components/CarContext';

const Tab2: React.FC = () => {
  const { addCar } = useCarContext();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [limiteAceite, setLimiteAceite] = useState<number>(5000);
  const [limiteBateria, setLimiteBateria] = useState<number>(30000);

  const guardar = () => {
    if (!marca || !modelo || !placa) {
      alert('Por favor completa todos los campos');
      return;
    }

    addCar({
      marca: marca,
      modelo: modelo,
      placa: placa,
      kilometraje: 0,
      ultimoAceite: 0,
      ultimaBateria: 0,
      limiteAceite: limiteAceite,
      limiteBateria: limiteBateria
    });

    setMarca('');
    setModelo('');
    setPlaca('');
    setLimiteAceite(5000);
    setLimiteBateria(30000);

    alert('Coche registrado exitosamente!');
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
          <IonLabel position="stacked">Marca *</IonLabel>
          <IonInput
            value={marca}
            onIonChange={e => setMarca(e.detail.value || '')}
            placeholder="Ej: Toyota"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Modelo *</IonLabel>
          <IonInput
            value={modelo}
            onIonChange={e => setModelo(e.detail.value || '')}
            placeholder="Ej: Corolla"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Placa *</IonLabel>
          <IonInput
            value={placa}
            onIonChange={e => setPlaca(e.detail.value || '')}
            placeholder="Ej: ABC123"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Km para cambio de aceite</IonLabel>
          <IonInput
            type="number"
            value={limiteAceite}
            onIonChange={e => setLimiteAceite(Number(e.detail.value) || 5000)}
            placeholder="5000"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Km para cambio de batería</IonLabel>
          <IonInput
            type="number"
            value={limiteBateria}
            onIonChange={e => setLimiteBateria(Number(e.detail.value) || 30000)}
            placeholder="30000"
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