import { useState } from 'react';
import MapCanvas from './components/MapCanvas';
import { STATES } from './data/states';

function App() {
  const [stateColors, setStateColors] = useState({});

  // Quick way to test colors
  const handleRandomize = () => {
    const newColors = {};
    const palette = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#e8e8e8"];
    STATES.forEach(state => {
      newColors[state.name] = palette[Math.floor(Math.random() * palette.length)];
    });
    setStateColors(newColors);
  };

  const handleReset = () => {
    setStateColors({});
  };

  return (
    <div className="flex w-full h-screen font-sans bg-gray-50 overflow-hidden text-gray-800">
      
      {/* Sidebar for testing */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto space-y-6 shrink-0 z-10 shadow-sm">
        <div className="border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">India Maps</h1>
          <p className="text-sm text-gray-500 mt-1">Phase 2: Geometry Test</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Click randomize to apply test colors map onto the SVG paths.
          </p>
          
          <button
            onClick={handleRandomize}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm"
          >
            Randomize Colors
          </button>
          
          <button
            onClick={handleReset}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm"
          >
            Reset (Gray)
          </button>
        </div>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative bg-gray-100/50 flex flex-col p-8">
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MapCanvas stateColors={stateColors} />
        </div>
      </main>

    </div>
  );
}

export default App;
