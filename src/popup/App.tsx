import React from 'react'
import './index.css'

function App() {
  const handlerDetailsClick = () => {
    window.location.href = '/info'
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  return (
    <div className="anti-tracking-container">
      <header>
        <h1>
          <span className="icon">👣</span> Anti - Tracking
        </h1>
      </header>

      <div className="risk-section">
        <div className="risk-info">
          <span className="icon">🛡️</span>
          <span>Risk of being tracking : 90%</span>
        </div>
        <a href="#" className="details-link" onClick={handlerDetailsClick}>
          Details →
        </a>
      </div>

      <div className="feature-section">
        <div className="feature-item">
          <span className="icon">👤</span>
          <span>Digital Fingerprint Hiding</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-item">
          <span className="icon">🔧</span>
          <span>Custom Configuration</span>
          <a href="#" className="config-link">
            Configuration →
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
