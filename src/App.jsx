import { useState, useMemo } from 'react';
import MapCanvas from './components/MapCanvas';
import MapTypeSelector from './components/MapTypeSelector';
import StateEditor from './components/StateEditor';
import { STATES } from './data/states';
import { percentageColor, absoluteColor, binaryColor, multiColor } from './lib/colorScales';

function App() {
  // 1a, 1b, 3
  const [mapType, setMapType] = useState('1a'); 
  const [stateValues, setStateValues] = useState({});

  // Type 3 configuration (default 3 categories)
  const [type3Categories, setType3Categories] = useState([
    { id: '1', name: 'High', color: '#10b981' },
    { id: '2', name: 'Medium', color: '#f59e0b' },
    { id: '3', name: 'Low', color: '#ef4444' }
  ]);

  // Handlers
  const handleMapTypeChange = (newType) => {
    setMapType(newType);
    setStateValues({}); // Clear values when map type completely changes
  };

  const handleStateValueChange = (stateName, value) => {
    setStateValues(prev => ({ ...prev, [stateName]: value }));
  };


  const handleType3Change = (action, idx, field, value) => {
    if (action === 'ADD') {
      setType3Categories(prev => [...prev, { id: Math.random().toString(), name: '', color: '#cccccc' }]);
    } else if (action === 'REMOVE') {
      setType3Categories(prev => prev.filter((_, i) => i !== idx));
    } else if (action === 'UPDATE') {
      setType3Categories(prev => {
        const next = [...prev];
        next[idx][field] = value;
        return next;
      });
    }
  };

  // Compute colors mapping for MapCanvas
  const computedStateColors = useMemo(() => {
    const colors = {};
    const allValues = Object.values(stateValues);

    STATES.forEach(state => {
      const val = stateValues[state.name];
      if (val === undefined || val === '') {
        colors[state.name] = "#f0f0f0";
        return;
      }

      if (mapType === '1a') {
        colors[state.name] = percentageColor(val);
      } else if (mapType === '1b') {
        colors[state.name] = absoluteColor(val, allValues);
      } else if (mapType === '3') {
        colors[state.name] = multiColor(val, type3Categories);
      }
    });

    return colors;
  }, [mapType, stateValues, type3Categories]);

  return (
    <div className="flex w-full h-screen font-sans bg-gray-50 overflow-hidden text-gray-800">
      
      {/* Sidebar Editor Area */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col pt-6 pb-0 overflow-hidden shrink-0 z-10 shadow-sm">
        <div className="px-6 border-b border-gray-100 pb-5 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Indi Maps</h1>
          <p className="text-sm text-gray-500 mt-1">Easily map India's data.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <MapTypeSelector 
            mapType={mapType} 
            onChange={handleMapTypeChange} 
          />

          <StateEditor 
            mapType={mapType}
            stateValues={stateValues}
            onStateValueChange={handleStateValueChange}
            type3Categories={type3Categories}
            onType3Change={handleType3Change}
          />
        </div>
      </aside>

      {/* Map Content Area */}
      <main className="flex-1 relative bg-gray-100/50 flex flex-col p-8 items-center justify-center">
        <div className="w-full max-w-4xl aspect-[4/5] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MapCanvas 
            stateColors={computedStateColors} 
            stateValues={stateValues} 
            mapType={mapType}
            categories={type3Categories}
          />
        </div>
      </main>

    </div>
  );
}

export default App;
