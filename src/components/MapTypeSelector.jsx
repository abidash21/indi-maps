export default function MapTypeSelector({ mapType, onChange }) {
  return (
    <div className="space-y-4 pb-6 border-b border-gray-200">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Map Type</h2>
      
      <div className="space-y-3">
        {/* Numeric Range */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-800 mb-2">
            <input
              type="radio"
              name="mapTypeGroup"
              checked={mapType === '1a' || mapType === '1b'}
              onChange={() => onChange('1b')}
              className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <span>Numeric Range</span>
          </label>
          
          {(mapType === '1a' || mapType === '1b') && (
            <div className="pl-6 space-y-2">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="radio"
                  name="numericSubtype"
                  checked={mapType === '1a'}
                  onChange={() => onChange('1a')}
                  className="text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                />
                <span>Percentage (0-100%)</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="radio"
                  name="numericSubtype"
                  checked={mapType === '1b'}
                  onChange={() => onChange('1b')}
                  className="text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                />
                <span>Absolute Number</span>
              </label>
            </div>
          )}
        </div>

        {/* Category */}
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-800">
          <input
            type="radio"
            name="mapTypeGroup"
            checked={mapType === '3'}
            onChange={() => onChange('3')}
            className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
          />
          <span>Category</span>
        </label>
      </div>
    </div>
  );
}
