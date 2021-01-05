import React, {useState, useEffect} from 'react';
import ChartWrapper from './ChartWrapper';
import GenderDropdown from './GenderDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

function App() {

  const [data, setData] = useState(null);
  const [gender, setGender] = useState('men');

  useEffect(() => {
    console.log(data)
    loadMainData()
  })

  const genderSelected = (gender) => {
    setGender(gender);
  }

  const loadMainData = () => {
    axios.get(`http://localhost:3000/info`)
      .then((response) => {
        // response = response.data;
        console.log(response);
        response.sort((a, b) => {
          if (a.positive < b.positive) {
            return -1;
          } else if (a.positive > b.positive) {
            return 1;
          }
          return 0;
        })
        let dataArr = response.slice(0, 14);
        setData(dataArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
