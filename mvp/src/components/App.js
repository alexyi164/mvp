import React, {useState, useEffect} from 'react';
import TotalCasesWrapper from './TotalCasesWrapper';
import ViewDropdown from './ViewDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

function App() {

  const [data, setData] = useState(null);
  const [view, setView] = useState('totalCases');

  const viewSelected = (view) => {
    setView(view);
  }

  return(
    <div>
      <Navbar bg="light">
        <Navbar.Brand>BoardDash</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <ViewDropdown view={view} viewSelected={viewSelected} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}></Col>
        </Row>
        <TotalCasesWrapper view={view}/>
      </Container>
    </div>
  )


  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // })

  // return (
  //   <div className="App">
  //     <p>You clicked {count} times</p>
  //     <button onClick={() => setCount(count + 1)}>
  //       Click Me
  //     </button>
  //   </div>
  // );
}

export default App;
