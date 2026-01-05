import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonToggle,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  mail,
  notifications,
  shield,
  logOut,
  save,
  car,
  settings,
  documentText,
  helpCircle,
  informationCircle,
  person
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { useCarContext } from '../../components/CarContext';
import ProfileHeader from '../../components/ProfileHeader';
import StatsCard from '../../components/StatsCard';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const history = useHistory();
  const { user, updateUser, logout } = useAuth();
  const { cars } = useCarContext();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email || '');
    }
  }, [user]);

  const guardarPerfil = () => {
    if (user) {
      updateUser({ username, email });
      setShowAlert(true);
    }
  };

  const confirmarCerrarSesion = () => {
    setShowLogoutAlert(true);
  };

  const cerrarSesion = () => {
    logout();
    history.push('/login');
  };

  // Calcular estadísticas
  const vehicleCount = cars.length;
  const upcomingMaintenance = cars.filter(car => {
    const remainingOil = car.limiteAceite - (car.kilometraje - car.ultimoAceite);
    return remainingOil < 1000;
  }).length;
  const totalRecords = cars.reduce((total, car) => total + car.kilometraje / 1000, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Encabezado del perfil */}
        {user && <ProfileHeader username={user.username} />}

        {/* Información personal */}
        <div className="profile-section">
          <h3>
            <IonIcon icon={person} style={{ marginRight: '8px', color: "primary" }} />
            "Información personal"
          </h3>
        </div>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nombre de usuario</IonLabel>
            <IonInput
              value={username}
              onIonChange={e => setUsername(e.detail.value || '')}
              placeholder="Tu nombre de usuario"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={e => setEmail(e.detail.value || '')}
              placeholder="tu@email.com"
            />
          </IonItem>
        </IonList>

        {/* Estadísticas */}
        <div className="profile-section">
          <h3>
            <IonIcon icon={documentText} style={{ marginRight: '8px', color: "primary" }} />
            "Mis estadísticas"
          </h3>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <StatsCard
                value={vehicleCount}
                label="Vehículos"
                color="primary"
              />
            </IonCol>
            <IonCol>
              <StatsCard
                value={upcomingMaintenance}
                label="Mantenimientos próximos"
                color="warning"
              />
            </IonCol>
            <IonCol>
              <StatsCard
                value={Math.round(totalRecords)}
                label="Registros totales"
                color="success"
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Botones de acción */}
        <div className="action-buttons">
          <IonButton
            expand="block"
            color="primary"
            onClick={guardarPerfil}
            className="save-button"
          >
            <IonIcon icon={save} slot="start" />
            Guardar cambios
          </IonButton>

          <IonButton
            expand="block"
            color="medium"
            fill="outline"
            onClick={confirmarCerrarSesion}
            className="logout-button"
          >
            <IonIcon icon={logOut} slot="start" />
            Cerrar sesión
          </IonButton>
        </div>

        {/* Alertas */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Cambios guardados"
          message="Tu perfil se ha actualizado correctamente."
          buttons={['OK']}
        />

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Cerrar sesión"
          message="¿Estás seguro de que quieres cerrar sesión?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Cerrar sesión',
              handler: cerrarSesion
            }
          ]}
        />
                        <div className="profile-section">
          <h3>
            <IonIcon icon={informationCircle} style={{ marginRight: '8px', color: "primary" }} />
            "Mis estadísticas"
          </h3>
        </div>
          <div>
            <p><strong>Mi Garaje App v1.0</strong></p>
            <p><small>Registra y controla el mantenimiento de tus vehículos</small></p>
            <p><small>• Sin conexión a internet necesaria</small></p>
            <p><small>• Datos almacenados localmente</small></p>
            <p><small>• Para uso personal</small></p>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;