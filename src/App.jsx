import { useState, useMemo } from 'react';
import MapCanvas from './components/MapCanvas';
import MapTypeSelector from './components/MapTypeSelector';
import StateEditor from './components/StateEditor';
import { STATES } from './data/states';
import { percentageColor, absoluteColor, multiColor } from './lib/colorScales';
import { exportMap } from './lib/exportUtils';

let nextBlockId = 4;

function App() {
  const [mapType, setMapType] = useState('1a'); 
  const [stateValues, setStateValues] = useState({});
  const [baseNumericColor, setBaseNumericColor] = useState('#1a6b2a');
  const [mapZoom, setMapZoom] = useState(1.0);

  const [type3Categories, setType3Categories] = useState([
    { id: '1', name: 'High', color: '#10b981' },
    { id: '2', name: 'Medium', color: '#f59e0b' },
    { id: '3', name: 'Low', color: '#ef4444' }
  ]);

  // Generic text blocks
  const [textBlocks, setTextBlocks] = useState([
    { id: 1, text: 'Title of the Map', fontSize: 48, fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', color: '#111827', position: { x: 540, y: 70 } },
    { id: 2, text: 'Source: Your Reference', fontSize: 16, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', color: '#6b7280', position: { x: 40, y: 1055 } },
    { id: 3, text: '• Point 1\n• Point 2', fontSize: 18, fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', color: '#374151', position: { x: 740, y: 650 } },
  ]);

  // Handlers
  const handleMapTypeChange = (newType) => {
    setMapType(newType);
    setStateValues({});
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

  // Text block handlers
  const addTextBlock = () => {
    setTextBlocks(prev => [...prev, {
      id: nextBlockId++,
      text: 'New Text',
      fontSize: 20,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      color: '#111827',
      position: { x: 540, y: 540 }
    }]);
  };

  const removeTextBlock = (id) => {
    setTextBlocks(prev => prev.filter(b => b.id !== id));
  };

  const updateTextBlock = (id, field, value) => {
    setTextBlocks(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const updateTextBlockPosition = (id, pos) => {
    setTextBlocks(prev => prev.map(b => b.id === id ? { ...b, position: pos } : b));
  };

  // Color computation
  const computedStateColors = useMemo(() => {
    const colors = {};
    const allValues = Object.values(stateValues);
    STATES.forEach(state => {
      const val = stateValues[state.name];
      if (val === undefined || val === '') {
        colors[state.name] = "#f0f0f0";
        return;
      }
      if (mapType === '1a') colors[state.name] = percentageColor(val, baseNumericColor);
      else if (mapType === '1b') colors[state.name] = absoluteColor(val, allValues, baseNumericColor);
      else if (mapType === '3') colors[state.name] = multiColor(val, type3Categories);
    });
    return colors;
  }, [mapType, stateValues, type3Categories, baseNumericColor]);

  const STYLE_BTN = (active) => 
    `px-2 py-1 text-[10px] rounded border transition-colors ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`;

  return (
    <div className="flex w-full h-screen font-sans bg-gray-50 overflow-hidden text-gray-800">
      
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col pt-6 pb-0 overflow-hidden shrink-0 z-10 shadow-sm">
        <div className="px-6 border-b border-gray-100 pb-5 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Indi Maps</h1>
          <p className="text-sm text-gray-500 mt-1">Easily map India's data.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Text Blocks */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Text Blocks</h2>
              <button onClick={addTextBlock} className="text-indigo-600 text-xs font-bold hover:text-indigo-800">+ ADD</button>
            </div>

            <div className="space-y-4">
              {textBlocks.map((block) => (
                <div key={block.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Block {block.id}</span>
                    <button onClick={() => removeTextBlock(block.id)} className="text-gray-300 hover:text-red-400 text-sm leading-none">×</button>
                  </div>

                  {/* Text input (multiline) */}
                  <textarea
                    value={block.text}
                    onChange={(e) => updateTextBlock(block.id, 'text', e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 resize-y font-mono"
                    placeholder="Enter text…"
                  />

                  {/* Size + Color row */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={block.color}
                      onChange={(e) => updateTextBlock(block.id, 'color', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 p-0 shrink-0"
                    />
                    <input
                      type="range" min="8" max="100"
                      value={block.fontSize}
                      onChange={(e) => updateTextBlock(block.id, 'fontSize', Number(e.target.value))}
                      className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <span className="text-[9px] text-gray-400 w-8 text-right shrink-0">{block.fontSize}px</span>
                  </div>

                  {/* Style buttons */}
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => updateTextBlock(block.id, 'fontWeight', block.fontWeight === 'bold' ? 'normal' : 'bold')}
                      className={STYLE_BTN(block.fontWeight === 'bold')}
                    ><strong>B</strong></button>

                    <button
                      onClick={() => updateTextBlock(block.id, 'fontWeight', block.fontWeight === '600' ? 'normal' : '600')}
                      className={STYLE_BTN(block.fontWeight === '600')}
                    >SB</button>

                    <button
                      onClick={() => updateTextBlock(block.id, 'fontStyle', block.fontStyle === 'italic' ? 'normal' : 'italic')}
                      className={STYLE_BTN(block.fontStyle === 'italic')}
                    ><em>I</em></button>

                    <button
                      onClick={() => updateTextBlock(block.id, 'textDecoration', block.textDecoration === 'underline' ? 'none' : 'underline')}
                      className={STYLE_BTN(block.textDecoration === 'underline')}
                    ><u>U</u></button>

                    <button
                      onClick={() => updateTextBlock(block.id, 'textDecoration', block.textDecoration === 'line-through' ? 'none' : 'line-through')}
                      className={STYLE_BTN(block.textDecoration === 'line-through')}
                    ><s>S</s></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Layout */}
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

            {(mapType === '1a' || mapType === '1b') && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Base Color (Range)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={baseNumericColor}
                    onChange={(e) => setBaseNumericColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs text-gray-400">{baseNumericColor}</span>
                </div>
              </div>
            )}
          </div>

          <MapTypeSelector 
            mapType={mapType} 
            onChange={handleMapTypeChange} 
          />

          {/* Export */}
          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Export Map</h2>
            <div className="grid grid-cols-2 gap-3 pb-8">
              <button
                onClick={() => exportMap('india-map-container', 'india-map', 'png')}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
              >
                PNG (1080px)
              </button>
              <button
                onClick={() => exportMap('india-map-container', 'india-map', 'svg')}
                className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold py-3 px-4 rounded-lg border border-gray-200 transition-all shadow-sm"
              >
                SVG Vector
              </button>
            </div>
          </div>

          <StateEditor 
            mapType={mapType}
            stateValues={stateValues}
            onStateValueChange={handleStateValueChange}
            type3Categories={type3Categories}
            onType3Change={handleType3Change}
          />
        </div>
      </aside>

      <main className="flex-1 relative bg-gray-100/50 flex flex-col p-8 items-center justify-center">
        <div className="w-full max-w-4xl aspect-[4/5] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MapCanvas 
            stateColors={computedStateColors} 
            stateValues={stateValues} 
            mapType={mapType}
            categories={type3Categories}
            baseNumericColor={baseNumericColor}
            mapZoom={mapZoom}
            textBlocks={textBlocks}
            onTextBlockPositionChange={updateTextBlockPosition}
          />
        </div>
      </main>

    </div>
  );
}

export default App;
