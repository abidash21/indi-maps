/**
 * Exports an SVG element to a high-resolution PNG or raw SVG file.
 * @param {string} svgId - The ID of the container or the SVG element.
 * @param {string} filename - Desired filename without extension.
 * @param {'png' | 'svg'} format - The export format.
 */
export async function exportMap(svgId, filename = 'india-map', format = 'png') {
  const container = document.getElementById(svgId);
  if (!container) return;

  const svgElement = container.querySelector('svg');
  if (!svgElement) return;

  // Clone SVG to avoid modifying the UI version
  const clonedSvg = svgElement.cloneNode(true);
  
  // Clean up any relative internal React props if they exist
  clonedSvg.removeAttribute('class');
  
  const svgData = new XMLSerializer().serializeToString(clonedSvg);

  if (format === 'svg') {
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `${filename}.svg`);
    return;
  }

  // PNG Export logic — render at 5x for ultra-sharp output
  const scale = 5;
  const baseSize = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = baseSize * scale;   // 3240
  canvas.height = baseSize * scale;  // 3240
  const ctx = canvas.getContext('2d');

  // Set the SVG to render at full resolution
  clonedSvg.setAttribute('width', baseSize * scale);
  clonedSvg.setAttribute('height', baseSize * scale);

  const hiResSvgData = new XMLSerializer().serializeToString(clonedSvg);
  const base64Data = btoa(unescape(encodeURIComponent(hiResSvgData)));
  const imgUrl = `data:image/svg+xml;base64,${base64Data}`;

  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise((resolve) => {
    img.onload = () => {
      // White background for PNG
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        downloadBlob(blob, `${filename}.png`);
        resolve();
      }, 'image/png');
    };
    img.src = imgUrl;
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
