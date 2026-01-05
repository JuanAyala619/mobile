import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { car, ellipse, home, person, square, triangle } from 'ionicons/icons';
import AuthGuard from './components/AuthGuard';
import Tab1 from './pages/app/Tab1';
import Tab2 from './pages/app/Tab2';
import Tab3 from './pages/app/Tab3';
import Login from './pages/Login'
import { CarProvider } from './components/CarContext';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme */
import './theme/variables.css';
import { AuthProvider } from './components/AuthContext';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <CarProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/app">
                <AuthGuard>
                  <IonTabs>
                    <IonRouterOutlet>

                      <Route exact path="/app/tab1">
                        <Tab1 />
                      </Route>

                      <Route exact path="/app/tab2">
                        <Tab2 />
                      </Route>

                      <Route exact path="/app/tab3">
                        <Tab3 />
                      </Route>

                      <Route exact path="/app">
                        <Redirect to="/app/tab1" />
                      </Route>

                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                      <IonTabButton tab="tab1" href="/app/tab1">
                        <IonIcon icon={home} />
                        <IonLabel>Inicio</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="tab2" href="/app/tab2">
                        <IonIcon icon={car} />
                        <IonLabel>Registrar</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="tab3" href="/app/tab3">
                        <IonIcon icon={person} />
                        <IonLabel>Perfil</IonLabel>
                      </IonTabButton>
                    </IonTabBar>

                  </IonTabs>
                </AuthGuard>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </CarProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;