/**
 * Climora Map Snapshot Utility
 * Captures high-resolution map views (2D Leaflet and 3D Mapbox) and downloads as PNG.
 */

export async function captureMapSnapshot(cityId = 'delhi'): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `climora-${cityId}-map-snapshot-${timestamp}.png`;

  try {
    // 1. Locate map container element (prefer exact map container)
    const mapElement =
      document.querySelector('.mapboxgl-map') ||
      document.querySelector('.leaflet-container') ||
      document.getElementById('climora-map-view') ||
      document.getElementById('climora-mapbox-view') ||
      document.getElementById('climora-map-container') ||
      (document.querySelector('main') as HTMLElement | null);

    if (!mapElement) {
      console.warn('[Climora] Map container element not found for snapshot');
      return false;
    }

    // 2. Dynamically import html2canvas for safe client-side execution
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default || html2canvasModule;

    const canvas = await html2canvas(mapElement as HTMLElement, {
      useCORS: true,
      allowTaint: false,
      scale: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 2) : 2,
      logging: false,
      backgroundColor: '#0a0f0d',
      imageTimeout: 8000,
      ignoreElements: (element) => {
        return element.classList.contains('climora-no-capture');
      },
    });

    // 3. Download canvas as PNG
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          try {
            const dataUrl = canvas.toDataURL('image/png');
            triggerDownload(dataUrl, filename);
            resolve(true);
          } catch {
            resolve(false);
          }
          return;
        }

        const url = URL.createObjectURL(blob);
        triggerDownload(url, filename, () => URL.revokeObjectURL(url));
        resolve(true);
      }, 'image/png');
    });
  } catch (error) {
    console.warn('[Climora] html2canvas error, attempting direct canvas fallback:', error);

    // Direct WebGL/Canvas Fallback
    try {
      const fallbackCanvas =
        (document.querySelector('.mapboxgl-canvas') as HTMLCanvasElement | null) ||
        (document.querySelector('.leaflet-container canvas') as HTMLCanvasElement | null) ||
        (document.querySelector('canvas') as HTMLCanvasElement | null);

      if (fallbackCanvas) {
        const dataUrl = fallbackCanvas.toDataURL('image/png');
        triggerDownload(dataUrl, filename);
        return true;
      }
    } catch (fallbackError) {
      console.error('[Climora] Fallback snapshot capture failed:', fallbackError);
    }

    return false;
  }
}

function triggerDownload(href: string, filename: string, onDone?: () => void) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (onDone) setTimeout(onDone, 500);
}
