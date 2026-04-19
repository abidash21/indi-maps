import { useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import indiaTopoRaw from '../data/india-states.json';
import { STATES } from '../data/states';

const SHORT_NAMES = {
  "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli\n& Daman and Diu",
  "Tamil Nadu": "Tamil Nadu"
};

// Custom offset overrides [xOffset, yOffset]
const LABEL_OFFSETS = {
  "Dadra and Nagar Haveli\n& Daman and Diu": [-30, 0],
  "Goa": [-25, 5],
  "Kerala": [-25, 5],
  "Lakshadweep": [-35, 0],
  "Puducherry": [45, 10],
  "Sikkim": [0, -15],
  "Tripura": [0, 25],
  "Mizoram": [35, 15],
  "Manipur": [35, 5],
  "Nagaland": [35, 0],
  "Arunachal Pradesh": [0, -15],
  "Andaman and Nicobar Islands": [-35, 0],
  "Chandigarh": [20, -10],
  "Delhi": [20, 0],
  "Punjab": [-15, 10],
  "Himachal Pradesh": [0, -15],
  "Karnataka": [-30, 10],
  "Jharkhand": [-15, 15],
  "Andhra Pradesh": [-40, 40],
  "Meghalaya": [0, 10]
};

export default function MapCanvas({ stateColors = {}, stateValues = {}, mapType, categories = [] }) {
  // Convert TopoJSON to GeoJSON features only once
  const features = useMemo(() => {
    return topojson.feature(indiaTopoRaw, indiaTopoRaw.objects.states).features;
  }, []);

  const width = 1080;
  const height = 1080;

  const pathGenerator = useMemo(() => {
    const projection = d3.geoMercator().fitSize([width, height], { type: "FeatureCollection", features });
    return d3.geoPath().projection(projection);
  }, [features]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-white relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="max-h-full max-w-full"
      >
        <g className="india-map">
          {features.map((feature) => {
            const stateInfo = STATES.find((s) => s.id === feature.id);
            const stateName = stateInfo ? stateInfo.name : "Unknown";
            const color = stateColors[stateName] || "#e8e8e8";

            return (
              <path
                key={feature.id || Math.random()}
                d={pathGenerator(feature)}
                fill={color}
                stroke="#ffffff"
                strokeWidth={1}
                className="transition-colors duration-300 ease-in-out"
              >
                <title>{stateName}</title>
              </path>
            );
          })}
        </g>
        
        {/* Render Labels After Paths for layering */}
        <g className="map-labels pointer-events-none">
          {features.map((feature) => {
            const stateInfo = STATES.find((s) => s.id === feature.id);
            if (!stateInfo) return null;

            const fullName = stateInfo.name;
            const displayName = SHORT_NAMES[fullName] || fullName;
            const value = stateValues[fullName] !== undefined && stateValues[fullName] !== '' ? stateValues[fullName] : '0';

            // Get centroid of the geometry
            let centroid = [0, 0];
            try {
              centroid = pathGenerator.centroid(feature);
              if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;
            } catch (e) {
              return null; // Some features might not render a valid centroid
            }

            const offset = LABEL_OFFSETS[displayName] || [0, 0];
            const x = centroid[0] + offset[0];
            const y = centroid[1] + offset[1];

            const showValue = mapType !== '3';

            // Determine text color based on background (heuristic for default color)
            // If it's light gray #e8e8e8, we should probably use black text. But per image, mostly white or black depending on the fill.
            // Let's just stick to white for now as it's the expected aesthetic for dark blue standard maps. We'll add text stroke/shadow.
            return (
              <text
                key={`label-${feature.id}`}
                x={x}
                y={y}
                textAnchor="middle"
                className="select-none font-sans"
                style={{ fill: '#ffffff', paintOrder: 'stroke', stroke: '#000000', strokeWidth: 2, filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }}
              >
                {displayName.split('\n').map((line, i) => {
                  const isSmall = displayName.includes("Dadra and Nagar Haveli");
                  return (
                    <tspan 
                      key={i} 
                      x={x} 
                      dy={i === 0 ? "-0.2em" : "1.1em"} 
                      className={isSmall ? "text-[8px] md:text-[10px]" : "text-[12px] md:text-[14px]"}
                    >
                      {line}
                    </tspan>
                  );
                })}
                {showValue && (
                  <tspan x={x} dy="1.1em" className="text-[16px] md:text-[18px] font-semibold">
                    {value}
                  </tspan>
                )}
              </text>
            );
          })}
        </g>

        {/* Category Legend */}
        {mapType === '3' && categories && categories.length > 0 && (
          <g className="map-legend" transform="translate(60, 60)">
            <rect x="0" y="0" width="220" height={categories.length * 30 + 30} fill="white" stroke="#e5e7eb" rx="8" opacity="0.95" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" />
            <text x="20" y="25" fontSize="14" fill="#111827" className="font-sans font-bold uppercase tracking-wider">Legend</text>
            {categories.map((cat, idx) => (
              <g key={cat.id} transform={`translate(20, ${40 + idx * 30})`}>
                <rect x="0" y="0" width="16" height="16" rx="4" fill={cat.color || "#cccccc"} stroke="#d1d5db" strokeWidth="1" />
                <text x="28" y="13" fontSize="14" fill="#374151" className="font-sans font-medium">
                  {cat.name || `Category ${idx+1}`}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
