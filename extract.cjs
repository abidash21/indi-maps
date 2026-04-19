const fs = require('fs');

try {
  const content = fs.readFileSync('src/data/india-states.json', 'utf8');
  let data = JSON.parse(content);

  let states = [];

  if (data.type === "Topology" && data.objects) {
    // Specifically use "states" object
    const geometries = data.objects.states.geometries;
    
    states = geometries.map((geo, idx) => {
      let name = geo.properties ? (geo.properties.st_nm || geo.properties.name || "Unknown") : "Unknown";
      geo.id = geo.id || `IN-${idx + 1}`;
      return { id: geo.id, name };
    });
  }

  let currentId = 0;
  const finalStates = states.map(s => {
    currentId++;
    return {
      id: s.id || `IN-${currentId}`,
      name: s.name
    };
  });

  const finalStatesSorted = finalStates.sort((a,b) => a.name.localeCompare(b.name));

  const fileExt = `export const STATES = [\n${finalStatesSorted.map(s => `  { id: "${s.id}", name: "${s.name}" }`).join(',\n')}\n];\n`;
  fs.writeFileSync('src/data/states.js', fileExt, 'utf8');
  fs.writeFileSync('src/data/india-states.json', JSON.stringify(data), 'utf8');
  console.log("Successfully regenerated states.js! Found " + finalStates.length + " states.");

} catch (e) {
  console.error(e);
}
