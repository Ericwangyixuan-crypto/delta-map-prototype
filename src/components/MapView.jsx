import React, { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function MapView(){
  const mapContainer = useRef(null)
  const mapRef = useRef(null)

  useEffect(()=>{
    if(mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [116.397389,39.908860],
      zoom: 12
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(new maplibregl.FullscreenControl())

    map.on('load', ()=>{
      // add sample POIs as GeoJSON source
      map.addSource('pois', {
        type: 'geojson',
        data: '/src/data/pois.geojson'
      })

      map.addLayer({
        id: 'poi-symbol',
        type: 'symbol',
        source: 'pois',
        layout: {
          'icon-image': 'marker-15',
          'icon-size': 1.5,
          'icon-allow-overlap': true,
          'text-field': ['get', 'name'],
          'text-offset': [0, 1.2],
          'text-size': 12
        },
        paint: {
          'text-color': '#fff'
        }
      })

      // popup on click
      map.on('click', 'poi-symbol', (e)=>{
        const features = map.queryRenderedFeatures(e.point, { layers: ['poi-symbol'] })
        if(!features.length) return
        const feature = features[0]
        const coords = feature.geometry.coordinates.slice()
        const props = feature.properties

        new maplibregl.Popup()
          .setLngLat(coords)
          .setHTML(`<strong>${props.name}</strong><p>${props.desc}</p>`)
          .addTo(map)
      })

      map.on('mouseenter','poi-symbol', ()=>{ map.getCanvas().style.cursor = 'pointer' })
      map.on('mouseleave','poi-symbol', ()=>{ map.getCanvas().style.cursor = '' })

    })

    mapRef.current = map

    return ()=> map.remove()
  },[])

  const exportPNG = ()=>{
    const map = mapRef.current
    if(!map) return
    const dataUrl = map.getCanvas().toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'delta-map-screenshot.png'
    a.click()
  }

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
      <div className="controls">
        <button onClick={exportPNG}>导出 PNG</button>
      </div>
    </div>
  )
}
