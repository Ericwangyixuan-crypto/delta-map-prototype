import React from 'react'
import MapView from './components/MapView'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <h1>三角洲 Delta — 高清地图 原型</h1>
        <p>参考 azlm.top，展示高保真交互和 POI。</p>
      </header>
      <main className="main">
        <MapView />
      </main>
      <footer className="footer">
        © Delta Map Prototype
      </footer>
    </div>
  )
}
