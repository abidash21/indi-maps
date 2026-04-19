import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import logoSrc from '../assets/statvyam.png';

export default function MapCanvas({ 
  topoData,
  featureKey,
  propertyKey,
  regionsList = [],
  shortNames = {},
  labelOffsets = {},
  stateColors = {}, 
  stateValues = {}, 
  mapType, 
  categories = [], 
  baseNumericColor = "#1a6b2a",
  mapZoom = 1.0,
  textBlocks = [],
  onTextBlockPositionChange,
}) {
  const svgRef = useRef(null);

  // Map + individual label drag state
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [labelDragOffsets, setLabelDragOffsets] = useState({});
  const [numericLegendOffset, setNumericLegendOffset] = useState({ x: 0, y: 0 });
  const [categoryLegendOffset, setCategoryLegendOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [logoBase64, setLogoBase64] = useState(null);

  // Convert logo to base64 on mount for SVG export compatibility
  useEffect(() => {
    fetch(logoSrc)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result);
        reader.readAsDataURL(blob);
      });
  }, []);

  const features = useMemo(() => {
    if (!topoData || !featureKey) return [];
    return topojson.feature(topoData, topoData.objects[featureKey]).features;
  }, [topoData, featureKey]);

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

  // SVG coordinate conversion
  const toSvgCoords = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgP.x, y: svgP.y };
  }, []);

  // Drag handlers
  const startDrag = useCallback((kind, id, origPos, e) => {
    e.stopPropagation();
    const { x, y } = toSvgCoords(e.clientX, e.clientY);
    setDragging({ kind, id, startX: x, startY: y, origX: origPos.x, origY: origPos.y });
  }, [toSvgCoords]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const { x, y } = toSvgCoords(e.clientX, e.clientY);
    const dx = x - dragging.startX;
    const dy = y - dragging.startY;
    const newPos = { x: dragging.origX + dx, y: dragging.origY + dy };

    if (dragging.kind === 'map') {
      setMapOffset(newPos);
    } else if (dragging.kind === 'label') {
      setLabelDragOffsets(prev => ({ ...prev, [dragging.id]: newPos }));
    } else if (dragging.kind === 'textblock') {
      onTextBlockPositionChange?.(dragging.id, newPos);
    } else if (dragging.kind === 'numeric-legend') {
      setNumericLegendOffset(newPos);
    } else if (dragging.kind === 'category-legend') {
      setCategoryLegendOffset(newPos);
    }
  }, [dragging, toSvgCoords, onTextBlockPositionChange]);

  const handleMouseUp = useCallback(() => setDragging(null), []);

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
          `}</style>
        </defs>

        <rect width={width} height={height} fill="white" />

        {/* ===== MAP (paths + labels, all draggable together) ===== */}
        <g 
          className="draggable"
          transform={`translate(${mapOffset.x}, ${mapOffset.y})`}
          onMouseDown={(e) => startDrag('map', null, mapOffset, e)}
        >
          {/* State paths */}
          {features.map((feature) => {
            const regionName = feature.properties[propertyKey];
            const color = stateColors[regionName] || "#e8e8e8";
            return (
              <path
                key={regionName || Math.random()}
                d={pathGenerator(feature)}
                fill={color}
                stroke="#ffffff"
                strokeWidth={1}
                className="transition-colors duration-300 ease-in-out"
              >
                <title>{regionName}</title>
              </path>
            );
          })}

          {/* State labels — each individually draggable */}
          {features.map((feature) => {
            const fullName = feature.properties[propertyKey];
            if (!fullName) return null;
            const displayName = shortNames[fullName] || fullName;
            const value = stateValues[fullName] !== undefined && stateValues[fullName] !== '' ? stateValues[fullName] : '0';
            let centroid = [0, 0];
            try {
              centroid = pathGenerator.centroid(feature);
              if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;
            } catch (e) { return null; }

            const preset = labelOffsets[displayName] || [0, 0];
            const userDrag = labelDragOffsets[fullName] || { x: 0, y: 0 };
            const x = centroid[0] + preset[0] * mapZoom + userDrag.x;
            const y = centroid[1] + preset[1] * mapZoom + userDrag.y;
            const showValue = mapType !== '3';
            const fontSizeBase = 14 * mapZoom;
            const fontSizeValue = 18 * mapZoom;
            const fontSizeSmall = 8 * mapZoom;

            return (
              <g
                key={`label-${fullName}`}
                className="draggable"
                onMouseDown={(e) => startDrag('label', fullName, userDrag, e)}
              >
                <text
                  x={x} y={y}
                  textAnchor="middle"
                  className="select-none"
                  style={{ fill: '#ffffff', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}
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

        {/* ===== Numeric Legend (non-text, stays as built-in, now draggable) ===== */}
        {(mapType === '1a' || mapType === '1b') && (
          <g 
            className="draggable"
            transform={`translate(${(width - 450) + numericLegendOffset.x}, ${160 + numericLegendOffset.y})`}
            onMouseDown={(e) => startDrag('numeric-legend', null, numericLegendOffset, e)}
          >
            <rect width="350" height="15" fill="url(#dynamic-gradient)" rx="4" stroke="#e5e7eb" />
            <text y="35" fontSize="14" fill="#374151" className="font-sans">0</text>
            <text x="350" y="35" textAnchor="end" fontSize="14" fill="#374151" className="font-sans">
              {mapType === '1a' ? '100%' : maxValue}
            </text>
          </g>
        )}

        {/* ===== Category Legend (now draggable) ===== */}
        {mapType === '3' && categories && categories.length > 0 && (
          <g 
            className="draggable"
            transform={`translate(${60 + categoryLegendOffset.x}, ${850 + categoryLegendOffset.y})`}
            onMouseDown={(e) => startDrag('category-legend', null, categoryLegendOffset, e)}
          >
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

        {/* ===== Generic Draggable Text Blocks ===== */}
        {textBlocks.map((block) => {
          const lines = block.text.split('\n');
          return (
            <g
              key={block.id}
              className="draggable"
              transform={`translate(${block.position.x}, ${block.position.y})`}
              onMouseDown={(e) => startDrag('textblock', block.id, block.position, e)}
            >
              {lines.map((line, i) => (
                <text
                  key={i}
                  y={i * (block.fontSize * 1.3)}
                  fontSize={block.fontSize}
                  fontWeight={block.fontWeight}
                  fontStyle={block.fontStyle}
                  textDecoration={block.textDecoration}
                  fill={block.color}
                  className="select-none font-sans"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* ===== Branding: bottom-right corner ===== */}
        <g transform={`translate(${width - 150}, ${height - 90})`} textAnchor="middle">
          <text x="0" y="0" fontSize="14" fill="#9ca3af" letterSpacing="1">
            created by
          </text>
          {logoBase64 && (
            <image
              href={logoBase64}
              x="-110"
              y="-10"
              width="220"
              height="85"
              preserveAspectRatio="xMidYMid meet"
            />
          )}
        </g>
      </svg>
    </div>
  );
}
