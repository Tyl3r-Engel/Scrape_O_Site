import React, { useEffect, useState } from 'react';
import { Dropdown, Container, Row, Col, Alert } from 'react-bootstrap'
import DictionaryView from './DictionaryView.jsx';
import Search from './Search.jsx';
import Login from './Login.jsx';
import Save from './Save.jsx';

export default function App() {
  const [currentSelection, setCurrentSelection] = useState('')
  const [currentSearchData, setCurrentSearchData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isError, setIsError] = useState({state:false, message:''})
  const [currentUser, setCurrentUser] = useState({userName:''})
  const [history, setHistory] = useState([])

  useEffect(() => {
    if(currentSearchData && !history.includes(currentSearchData)) {
      setHistory(prev => [...prev, currentSearchData])
    }
  },[currentSearchData, setHistory, history])
  return (
    <Container className="p-3 border border-dark">
      <Row className="p-3 text-center border border-dark">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentSelection === '' ? (
                'Select'
              ) : (
                currentSelection
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCurrentSelection('Dictionary')}>Dictionary</Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentSelection('100% real website')}>100% real website</Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentSelection('Definitely a website')}>Definitely a website</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <h1>Scrape O Site</h1>
        </Col>
        <Col>
          <Save args={{currentSearchData, currentUser, setIsError}} />
        </Col>
      </Row>
      {isError.state && (
        <Row>
          <Alert variant="danger" onClose={() => setIsError({state:false, message:''})} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {isError.message}
            </p>
          </Alert>
        </Row>
      )}
      <Row>
        <br />
      </Row>
      <Row>
        <Col className="p-3 block-example border border-dark">
          <Search args={{setCurrentSearchData, currentSelection, isSearching, setIsSearching, setIsError}} />
          {isSearching &&
          (
            'loading...'
          )}
          {(currentSearchData?.website === 'Dictionary' && !isSearching) && (
            <DictionaryView args={currentSearchData} />
          )}
        </Col>
        <Col xs lg="1">
        </Col>
        <Col xs lg="4" className="p-3 text-center border border-dark">
          {currentUser.userName !== '' ? (
            <strong>Welcome, {currentUser.userName}</strong>
          ) : (
            <Login args={{ setCurrentUser, setHistory }} />
          )}
          <br />
          {history.map((element, index) => (
            <>
              <br />
              <div className="border border-dark" key={index} onClick={() => setCurrentSearchData(element)}>
                <strong>{element.website}</strong>
                <p>word: {element.word}</p>
              </div>
            </>
          ))}
        </Col>
      </Row>
    </Container>
  )
}