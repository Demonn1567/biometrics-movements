import React from 'react';
import './App.css';
import UserBehaviorTracker from './UserBehaviorTracker';
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <div className="App">
          <Analytics/>
            <UserBehaviorTracker />
        </div>
    );
}

export default App;