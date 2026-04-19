import { useMemo, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import indiaTopoRaw from '../data/india-states.json';
import { STATES } from '../data/states';

const SHORT_NAMES = {
  "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli\n& Daman and Diu",
  "Tamil Nadu": "Tamil Nadu"
};

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

const DEFAULT_POSITIONS = {
  title:    { x: 540, y: 70 },
  legend:   { x: 630, y: 160 },
  source:   { x: 40,  y: 1055 },
  notes:    { x: 740, y: 650 },
  map:      { x: 0,   y: 0 },
  category: { x: 60,  y: 850 },
};

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
  const svgRef = useRef(null);

  const [positions, setPositions] = useState(DEFAULT_POSITIONS);
  // Per-state label drag offsets: { "Maharashtra": {x: 5, y: -10}, … }
  const [labelDragOffsets, setLabelDragOffsets] = useState({});
  // dragging can be a component key OR { type: 'label', stateName: '...' }
  const [dragging, setDragging] = useState(null);

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
    const x0 = centerX - scaledWidth / 2;
    const x1 = centerX + scaledWidth / 2;
    const y0 = centerY - (scaledHeight / 2) + 60;
    const y1 = centerY + (scaledHeight / 2) + 60;
    const projection = d3.geoMercator().fitExtent([[x0, y0], [x1, y1]], { type: "FeatureCollection", features });
    return d3.geoPath().projection(projection);
  }, [features, mapZoom]);

  const maxValue = useMemo(() => {
    if (mapType !== '1b') return 100;
    const values = Object.values(stateValues).map(v => Number(v)).filter(v => !isNaN(v));
    const m = values.length > 0 ? Math.max(...values, 0) : 100;
    return m === 0 ? 100 : m;
  }, [stateValues, mapType]);

  const titleLines = useMemo(() => wrapText(title, 35), [title]);

  const toSvgCoords = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgP.x, y: svgP.y };
  }, []);

  const handleComponentMouseDown = useCallback((key, e) => {
    e.stopPropagation();
    const { x, y } = toSvgCoords(e.clientX, e.clientY);
    setDragging({
      type: 'component',
      key,
      startX: x,
      startY: y,
      origX: positions[key].x,
      origY: positions[key].y,
    });
  }, [positions, toSvgCoords]);

  const handleLabelMouseDown = useCallback((stateName, e) => {
    e.stopPropagation();
    const { x, y } = toSvgCoords(e.clientX, e.clientY);
    const cur = labelDragOffsets[stateName] || { x: 0, y: 0 };
    setDragging({
      type: 'label',
      stateName,
      startX: x,
      startY: y,
      origX: cur.x,
      origY: cur.y,
    });
  }, [labelDragOffsets, toSvgCoords]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const { x, y } = toSvgCoords(e.clientX, e.clientY);
    const dx = x - dragging.startX;
    const dy = y - dragging.startY;

    if (dragging.type === 'component') {
      setPositions(prev => ({
        ...prev,
        [dragging.key]: {
          x: dragging.origX + dx,
          y: dragging.origY + dy,
        }
      }));
    } else if (dragging.type === 'label') {
      setLabelDragOffsets(prev => ({
        ...prev,
        [dragging.stateName]: {
          x: dragging.origX + dx,
          y: dragging.origY + dy,
        }
      }));
    }
  }, [dragging, toSvgCoords]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  const DragHandle = ({ x, y }) => (
    <circle cx={x} cy={y} r="8" fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" className="drag-handle" />
  );

  return (
    <div id="india-map-container" className="w-full h-full flex justify-center items-center overflow-hidden bg-white relative">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="max-h-full max-w-full"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <linearGradient id="dynamic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={baseNumericColor} />
          </linearGradient>
          <style>{`
            .draggable { cursor: grab; }
            .draggable:active { cursor: grabbing; }
            .drag-handle { opacity: 0; transition: opacity 0.2s; pointer-events: none; }
            .draggable:hover .drag-handle { opacity: 1; }
          `}</style>
        </defs>

        <rect width={width} height={height} fill="white" />

        {/* ===== DRAGGABLE: Map (paths + labels move together) ===== */}
        <g 
          className="draggable"
          transform={`translate(${positions.map.x}, ${positions.map.y})`}
          onMouseDown={(e) => handleComponentMouseDown('map', e)}
        >
          {/* State paths */}
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

          {/* State labels — each individually draggable within the map group */}
          {features.map((feature) => {
            const stateInfo = STATES.find((s) => s.id === feature.id);
            if (!stateInfo) return null;
            const fullName = stateInfo.name;
            const displayName = SHORT_NAMES[fullName] || fullName;
            const value = stateValues[fullName] !== undefined && stateValues[fullName] !== '' ? stateValues[fullName] : '0';
            let centroid = [0, 0];
            try {
              centroid = pathGenerator.centroid(feature);
              if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;
            } catch (e) { return null; }

            const preset = LABEL_OFFSETS[displayName] || [0, 0];
            const userDrag = labelDragOffsets[fullName] || { x: 0, y: 0 };
            const x = centroid[0] + preset[0] * mapZoom + userDrag.x;
            const y = centroid[1] + preset[1] * mapZoom + userDrag.y;
            const showValue = mapType !== '3';
            const fontSizeBase = 14 * mapZoom;
            const fontSizeValue = 18 * mapZoom;
            const fontSizeSmall = 8 * mapZoom;

            return (
              <g
                key={`label-${feature.id}`}
                className="draggable"
                onMouseDown={(e) => handleLabelMouseDown(fullName, e)}
                style={{ cursor: 'grab' }}
              >
                <text
                  x={x} y={y}
                  textAnchor="middle"
                  className="select-none font-sans"
                  style={{ fill: '#ffffff', paintOrder: 'stroke', stroke: '#000000', strokeWidth: 2 * mapZoom, filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }}
                >
                  {displayName.split('\n').map((line, i) => {
                    const isSmall = displayName.includes("Dadra and Nagar Haveli");
                    return (
                      <tspan key={i} x={x} dy={i === 0 ? "-0.2em" : "1.1em"} fontSize={isSmall ? fontSizeSmall : fontSizeBase}>
                        {line}
                      </tspan>
                    );
                  })}
                  {showValue && (
                    <tspan x={x} dy="1.1em" fontSize={fontSizeValue} fontWeight="bold">{value}</tspan>
                  )}
                </text>
              </g>
            );
          })}
        </g>

        {/* ===== DRAGGABLE: Title + Subtitle ===== */}
        <g 
          className="draggable"
          transform={`translate(${positions.title.x}, ${positions.title.y})`}
          onMouseDown={(e) => handleComponentMouseDown('title', e)}
          textAnchor="middle"
        >
          <DragHandle x={0} y={-10} />
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

        {/* ===== DRAGGABLE: Source ===== */}
        <g
          className="draggable"
          transform={`translate(${positions.source.x}, ${positions.source.y})`}
          onMouseDown={(e) => handleComponentMouseDown('source', e)}
        >
          <DragHandle x={0} y={-5} />
          <text fontSize="16" fill="#6b7280" className="font-sans font-medium">
            {source}
          </text>
        </g>

        {/* ===== DRAGGABLE: Numeric Legend ===== */}
        {(mapType === '1a' || mapType === '1b') && (
          <g 
            className="draggable"
            transform={`translate(${positions.legend.x}, ${positions.legend.y})`}
            onMouseDown={(e) => handleComponentMouseDown('legend', e)}
          >
            <DragHandle x={0} y={-15} />
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

        {/* ===== DRAGGABLE: Category Legend ===== */}
        {mapType === '3' && categories && categories.length > 0 && (
          <g 
            className="draggable"
            transform={`translate(${positions.category.x}, ${positions.category.y})`}
            onMouseDown={(e) => handleComponentMouseDown('category', e)}
          >
            <DragHandle x={0} y={-5} />
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

        {/* ===== DRAGGABLE: Notes ===== */}
        {notes && notes.length > 0 && (
          <g 
            className="draggable"
            transform={`translate(${positions.notes.x}, ${positions.notes.y})`}
            onMouseDown={(e) => handleComponentMouseDown('notes', e)}
          >
            <DragHandle x={0} y={-5} />
            <text fontSize={notesSize + 2} fontWeight="bold" fill="#111827" className="font-sans">Notes:</text>
            {notes.map((note, idx) => {
              const wrappedNote = wrapText(note, 25);
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
