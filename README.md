# Delta Map Prototype

This repository contains a high-definition interactive map prototype for Tencent Delta (三角洲行动). It uses MapLibre GL JS + React and a sample GeoJSON POI dataset.

Quick start:

1. Install:

   npm install

2. Run locally:

   npm run dev

3. Open http://localhost:3000

What this prototype includes:
- MapLibre GL JS map with navigation controls
- Sample POIs loaded from src/data/pois.geojson
- Click POIs to see popups
- Export map to PNG

Next steps (in progress):
- Replace sample POIs with official/community data (DeltaForceData)
- Build vector tile pipeline (Tippecanoe) and host tiles on CDN
- Integrate high-resolution sprite atlas and custom map imagery

Repo: https://github.com/Ericwangyixuan-crypto/delta-map-prototype
