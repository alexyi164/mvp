import React, {useState, useEffect} from 'react';
import ChartWrapper from './ChartWrapper';
import GenderDropdown from './GenderDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {

  const [gender, setGender] = useState('men');

  const genderSelected = (gender) => {
    setGender(gender);
  }

  return(
    <div>
      <Navbar bg="light">
        <Navbar.Brand>BoardDash</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <GenderDropdown genderSelected={genderSelected} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}></Col>
        </Row>
        <ChartWrapper gender={gender}/>
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
