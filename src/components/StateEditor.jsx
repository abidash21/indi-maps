import { STATES } from '../data/states';

export default function StateEditor({
  mapType,
  stateValues,
  onStateValueChange,
  type2Groups,
  onType2Change,
  type3Categories,
  onType3Change,
}) {
  return (
    <div className="flex flex-col space-y-6">
      

      {mapType === '3' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex justify-between items-center">
            <span>Categories</span>
            <button 
              onClick={() => onType3Change('ADD')}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
            >
              + Add
            </button>
          </h3>
          <div className="space-y-3">
            {type3Categories.map((cat, idx) => (
              <div key={cat.id} className="flex items-center space-x-2">
                <input
                  type="color"
                  value={cat.color}
                  onChange={(e) => onType3Change('UPDATE', idx, 'color', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  placeholder={`Category ${idx + 1}`}
                  value={cat.name}
                  onChange={(e) => onType3Change('UPDATE', idx, 'name', e.target.value)}
                  className="flex-1 text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500"
                />
                {type3Categories.length > 2 && (
                  <button 
                    onClick={() => onType3Change('REMOVE', idx)}
                    className="text-gray-400 hover:text-red-500 font-bold px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white py-2 z-10 border-b border-gray-100">
          State Values
        </h3>
        {STATES.map(state => {
          const val = stateValues[state.name] || '';
          
          return (
            <div key={state.id} className="flex flex-col space-y-1 pb-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 p-1 -mx-1 px-1 rounded transition-colors text-sm">
              <span className="text-gray-700 select-none text-xs">{state.name}</span>
              
              {(mapType === '1a' || mapType === '1b') && (
                <input
                  type="number"
                  placeholder={mapType === '1a' ? "0-100" : "Value"}
                  value={val}
                  onChange={(e) => onStateValueChange(state.name, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              )}


              {mapType === '3' && (
                <select
                  value={val}
                  onChange={(e) => onStateValueChange(state.name, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 bg-white"
                >
                  <option value="">-- None --</option>
                  {type3Categories.map(cat => (
                    cat.name ? <option key={cat.id} value={cat.name}>{cat.name}</option> : null
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
