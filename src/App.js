import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

// Material Components
import Box from '@mui/material/Box';

// Local Components
// import BarGraphWMark from './components/graph/barGraphWMark';
// import DonutGraph from './components/graph/donutGraph';
// import PieGraph from './components/graph/pieGraph';
import Navigation from './components/navigation';
import Card from './components/card';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '25px 40px',
    
    '& > div': {
      width: '32%',
      marginRight: '10px',
      marginBottom: '10px',
    },
    '& > div:last-child': {
      marginRight: 0,
    },
  }
}));

function App() {
  const classes = useStyles();
  // const [changeBarData, setBarData] = useState(false);
  // const [hasMark, setMark] = useState(false);

  return (
    <main className="app">
      <Navigation />
      <Box className={classes.cardContainer}>
        <Card>
          Test 1
        </Card>
        <Card>
          Test 2
        </Card>
        <Card>
          Test 3
        </Card>
        <Card>
          Test 4
        </Card>
      </Box>
      
      {/* <h1>Sample Graphs</h1>
      <section>
        <h1>Bar Graph</h1>
        <button onClick={() => setBarData(!changeBarData)}>Set Bar Data</button>
        <button onClick={() => setMark(!hasMark)}>Set Mark</button>
        <BarGraphWMark set={changeBarData} wMark={hasMark} />
        <h1>Donut Graph</h1>
        <DonutGraph />
        <h1>Pie Graph</h1>
        <PieGraph />
      </section> */}
    </main>
  );
}

export default App;
