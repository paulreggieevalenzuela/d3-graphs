import React, { useState } from 'react';

import BarGraphWMark from './components/graph/barGraphWMark';
import DonutGraph from './components/graph/donutGraph';
import PieGraph from './components/graph/pieGraph';

function App() {
  const [changeBarData, setBarData] = useState(false);
  const [hasMark, setMark] = useState(false);

  return (
    <main className="app">
      <h1>Sample Graphs</h1>
      <section>
        <h1>Bar Graph</h1>
        <button onClick={() => setBarData(!changeBarData)}>Set Bar Data</button>
        <button onClick={() => setMark(!hasMark)}>Set Mark</button>
        <BarGraphWMark set={changeBarData} wMark={hasMark} />
        <h1>Donut Graph</h1>
        <DonutGraph />
        <h1>Pie Graph</h1>
        <PieGraph />
      </section>
    </main>
  );
}

export default App;
