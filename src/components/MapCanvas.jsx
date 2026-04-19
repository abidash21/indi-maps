import { useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import indiaTopoRaw from '../data/india-states.json';
import { STATES } from '../data/states';

export default function MapCanvas({ stateColors = {} }) {
  // Convert TopoJSON to GeoJSON features only once
  const features = useMemo(() => {
    return topojson.feature(indiaTopoRaw, indiaTopoRaw.objects.states).features;
  }, []);

  // Compute the projection and path generator
  // SVG bounding box
  const width = 1080;
  const height = 1080;

  const pathGenerator = useMemo(() => {
    // We want the Mercator projection fit to India's bounds
    const projection = d3.geoMercator().fitSize([width, height], { type: "FeatureCollection", features });
    return d3.geoPath().projection(projection);
  }, [features]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-white">
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
      </svg>
    </div>
  );
}
