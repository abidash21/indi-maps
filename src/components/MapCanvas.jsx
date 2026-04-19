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
  "Uttarakhand": [10, 0],
  "Andhra Pradesh": [-40, 40],
  "Meghalaya": [0, 10]
};

// Helper to wrap text into lines based on character length
function wrapText(text, maxChars = 30) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

export default function MapCanvas({ 
  stateColors = {}, 
  stateValues = {}, 
  mapType, 
  categories = [], 
  title = "Map Title", 
  titleSize = 48,
  subtitle = "",
  legendTitle = "",
  baseNumericColor = "#1a6b2a",
  source = "",
  notes = [],
  notesSize = 18,
  mapZoom = 1.0
}) {
  // Convert TopoJSON to GeoJSON features only once
  const features = useMemo(() => {
    return topojson.feature(indiaTopoRaw, indiaTopoRaw.objects.states).features;
  }, []);

  const width = 1080;
  const height = 1080;

  const pathGenerator = useMemo(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const baseWidth = 900;
    const baseHeight = 840;
    
    const scaledWidth = baseWidth * mapZoom;
    const scaledHeight = baseHeight * mapZoom;
    
    // Position slightly lower to clear title area
    const x0 = centerX - scaledWidth / 2;
    const x1 = centerX + scaledWidth / 2;
    const y0 = centerY - (scaledHeight / 2) + 60;
    const y1 = centerY + (scaledHeight / 2) + 60;

    const projection = d3.geoMercator().fitExtent([[x0, y0], [x1, y1]], { type: "FeatureCollection", features });
    return d3.geoPath().projection(projection);
  }, [features, mapZoom]);

  // Compute max for legend 1b
  const maxValue = useMemo(() => {
    if (mapType !== '1b') return 100;
    const values = Object.values(stateValues).map(v => Number(v)).filter(v => !isNaN(v));
    const m = values.length > 0 ? Math.max(...values, 0) : 100;
    return m === 0 ? 100 : m;
  }, [stateValues, mapType]);

  const titleLines = useMemo(() => wrapText(title, 35), [title]);

  return (
    <div id="india-map-container" className="w-full h-full flex justify-center items-center overflow-hidden bg-white relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="max-h-full max-w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dynamic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={baseNumericColor} />
          </linearGradient>
        </defs>

        <rect width={width} height={height} fill="white" />

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
              return null;
            }

            const offset = LABEL_OFFSETS[displayName] || [0, 0];
            const x = centroid[0] + offset[0] * mapZoom;
            const y = centroid[1] + offset[1] * mapZoom;

            const showValue = mapType !== '3';

            const fontSizeBase = 14 * mapZoom;
            const fontSizeValue = 18 * mapZoom;
            const fontSizeSmall = 8 * mapZoom;

            return (
              <text
                key={`label-${feature.id}`}
                x={x}
                y={y}
                textAnchor="middle"
                className="select-none font-sans"
                style={{ fill: '#ffffff', paintOrder: 'stroke', stroke: '#000000', strokeWidth: 2 * mapZoom, filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }}
              >
                {displayName.split('\n').map((line, i) => {
                  const isSmall = displayName.includes("Dadra and Nagar Haveli");
                  return (
                    <tspan 
                      key={i} 
                      x={x} 
                      dy={i === 0 ? "-0.2em" : "1.1em"} 
                      fontSize={isSmall ? fontSizeSmall : fontSizeBase}
                    >
                      {line}
                    </tspan>
                  );
                })}
                {showValue && (
                  <tspan x={x} dy="1.1em" fontSize={fontSizeValue} fontWeight="bold">
                    {value}
                  </tspan>
                )}
              </text>
            );
          })}
        </g>

        {/* Title and Subtitle - Wrapped Title */}
        <g transform={`translate(${width / 2}, 70)`} textAnchor="middle">
          {titleLines.map((line, i) => (
            <text key={i} y={i * (titleSize * 1.05)} fontSize={titleSize} fontWeight="bold" fill="#111827" className="font-sans">
              {line}
            </text>
          ))}
          {subtitle && (
            <text y={titleLines.length * (titleSize * 1.05) + 5} fontSize="20" fill="#4b5563" className="font-sans italic">
              {subtitle}
            </text>
          )}
        </g>

        {/* Dedicated Source */}
        <text x={40} y={height - 25} fontSize="16" fill="#6b7280" className="font-sans font-medium">
          {source}
        </text>

        {/* Numeric Legend - With Legend Title above */}
        {(mapType === '1a' || mapType === '1b') && (
          <g transform={`translate(${width - 450}, 160)`}>
             {legendTitle && (
               <text x={175} y="-15" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#374151" className="font-sans">
                 {legendTitle}
               </text>
             )}
            <rect width="350" height="15" fill="url(#dynamic-gradient)" rx="4" stroke="#e5e7eb" />
            <text y="35" fontSize="14" fill="#374151" className="font-sans">0</text>
            <text x="350" y="35" textAnchor="end" fontSize="14" fill="#374151" className="font-sans">
              {mapType === '1a' ? '100%' : maxValue}
            </text>
          </g>
        )}

        {/* Category Legend */}
        {mapType === '3' && categories && categories.length > 0 && (
          <g className="map-legend" transform="translate(60, 850)">
            {categories.map((cat, idx) => (
              <g key={cat.id} transform={`translate(0, ${idx * 30})`}>
                <rect x="0" y="0" width="18" height="18" rx="4" fill={cat.color || "#cccccc"} />
                <text x="30" y="14" fontSize="16" fill="#1f2937" className="font-sans font-semibold">
                  {cat.name || `Category ${idx+1}`}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Notes Section - level of Odisha, Point Wrapping */}
        {notes && notes.length > 0 && (
          <g className="map-notes" transform="translate(740, 650)">
            <text fontSize={notesSize + 2} fontWeight="bold" fill="#111827" className="font-sans mb-2">Notes:</text>
            {notes.map((note, idx) => {
              const wrappedNote = wrapText(note, 25);
              let cumulativeY = 0;
              // We need to calculate cumulative Y based on current index and previous wrapped lines
              // For simplicity, let's just render the wrapped lines for each point
              // Actually, I'll calculate total offset based on overall index
              return (
                <g key={idx} transform={`translate(0, ${30 + idx * 50})`}>
                  <text fontSize={notesSize} fill="#374151" className="font-sans">
                    <tspan x="0" fontWeight="bold">•</tspan>
                    {wrappedNote.map((line, li) => (
                      <tspan key={li} x="15" dy={li === 0 ? "0" : "1.2em"}>{line}</tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
