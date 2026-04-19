import { useState, useMemo } from 'react';
import MapCanvas from './components/MapCanvas';
import MapTypeSelector from './components/MapTypeSelector';
import StateEditor from './components/StateEditor';
import { STATES } from './data/states';
import { percentageColor, absoluteColor, binaryColor, multiColor } from './lib/colorScales';

function App() {
  const [mapType, setMapType] = useState('1a'); 
  const [stateValues, setStateValues] = useState({});
  const [title, setTitle] = useState('Title of the Map');
  const [titleSize, setTitleSize] = useState(48);
  const [subtitle, setSubtitle] = useState('');
  const [legendTitle, setLegendTitle] = useState('Indicator Name');
  const [baseNumericColor, setBaseNumericColor] = useState('#1a6b2a'); // Green default
  const [source, setSource] = useState('Source: Your Reference');
  const [notes, setNotes] = useState(['Point 1', 'Point 2']);
  const [notesSize, setNotesSize] = useState(18);
  const [mapZoom, setMapZoom] = useState(1.0);

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


  const handleNotesChange = (idx, value) => {
    const next = [...notes];
    next[idx] = value;
    setNotes(next);
  };

  const addNote = () => setNotes([...notes, '']);
  const removeNote = (idx) => setNotes(notes.filter((_, i) => i !== idx));

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
        colors[state.name] = percentageColor(val, baseNumericColor);
      } else if (mapType === '1b') {
        colors[state.name] = absoluteColor(val, allValues, baseNumericColor);
      } else if (mapType === '3') {
        colors[state.name] = multiColor(val, type3Categories);
      }
    });

    return colors;
  }, [mapType, stateValues, type3Categories, baseNumericColor]);

  return (
    <div className="flex w-full h-screen font-sans bg-gray-50 overflow-hidden text-gray-800">
      
      {/* Sidebar Editor Area */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col pt-6 pb-0 overflow-hidden shrink-0 z-10 shadow-sm">
        <div className="px-6 border-b border-gray-100 pb-5 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Indi Maps</h1>
          <p className="text-sm text-gray-500 mt-1">Easily map India's data.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Map Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Main Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Map Title"
                />
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-[10px] text-gray-400">Size</span>
                  <input 
                    type="range" min="20" max="100" 
                    value={titleSize} 
                    onChange={(e) => setTitleSize(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[10px] text-gray-400">{titleSize}px</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Subtitle"
                />
              </div>

              {(mapType === '1a' || mapType === '1b') && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Legend Title</label>
                    <input
                      type="text"
                      value={legendTitle}
                      onChange={(e) => setLegendTitle(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500"
                      placeholder="e.g. Population"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Base Color (Range)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={baseNumericColor}
                        onChange={(e) => setBaseNumericColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                      />
                      <span className="text-xs text-gray-400 capitalize">{baseNumericColor}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Dedicated Source</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Source: Reference"
                />
              </div>

              <div className="pt-2 border-t border-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-gray-500">Points / Notes</label>
                  <button onClick={addNote} className="text-indigo-600 text-[10px] font-bold">+ ADD POINT</button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {notes.map((note, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => handleNotesChange(idx, e.target.value)}
                        className="flex-1 text-[11px] border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500"
                        placeholder={`Point ${idx + 1}`}
                      />
                      <button onClick={() => removeNote(idx)} className="text-gray-300 hover:text-red-400">×</button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-[10px] text-gray-400">Size</span>
                  <input 
                    type="range" min="10" max="40" 
                    value={notesSize} 
                    onChange={(e) => setNotesSize(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[10px] text-gray-400">{notesSize}px</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Map Layout</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Map Zoom & Labels Size</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" min="0.5" max="2.0" step="0.05"
                  value={mapZoom} 
                  onChange={(e) => setMapZoom(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-[10px] text-gray-400">{(mapZoom * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

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
            title={title}
            titleSize={titleSize}
            subtitle={subtitle}
            legendTitle={legendTitle}
            baseNumericColor={baseNumericColor}
            source={source}
            notes={notes}
            notesSize={notesSize}
            mapZoom={mapZoom}
          />
        </div>
      </main>

    </div>
  );
}

export default App;
