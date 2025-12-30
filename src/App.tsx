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

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
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

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <CarProvider>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>

              <Route exact path="/tab1">
                <Tab1 />
              </Route>

              <Route exact path="/tab2">
                <Tab2 />
              </Route>

              <Route exact path="/tab3">
                <Tab3 />
              </Route>

              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>

            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={home} />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={car} />
                <IonLabel>Registrar</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>

          </IonTabs>
        </IonReactRouter>
      </CarProvider>
    </IonApp>
  );
};

export default App;