import { useState } from 'react';
import LandingPage from './components/LandingPage';
import MapEditor from './components/MapEditor';
import { MAP_CONFIGS } from './data/mapConfigs';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedMapId, setSelectedMapId] = useState(null);

  const handleSelectMap = (mapId) => {
    setSelectedMapId(mapId);
    setCurrentView('editor');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedMapId(null);
  };

  if (currentView === 'landing') {
    return <LandingPage onSelectMap={handleSelectMap} />;
  }

  if (currentView === 'editor' && selectedMapId && MAP_CONFIGS[selectedMapId]) {
    return (
      <MapEditor 
        config={MAP_CONFIGS[selectedMapId]} 
        onBack={handleBackToLanding} 
      />
    );
  }

  return <LandingPage onSelectMap={handleSelectMap} />;
}

export default App;
