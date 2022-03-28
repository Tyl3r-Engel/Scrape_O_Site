import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

export default function DictionaryView({args}) {
  const {
    word,
    pron,
    partOfSpeech,
    definition,
  } = args
  const formattedDef = definition.split('.')
  return (
    <Container className="m-2 border border-dark">
      <Row>
        <Col>
          <strong>
            {word}
          </strong>
        </Col>
        <Col>
          <span>{pron}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{`Part Of Speech: ${partOfSpeech}`}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          {formattedDef.map((element, index) => (
            <span key={index}>{element}<br /></span>
          ))}
        </Col>
      </Row>
    </Container>
  )
}