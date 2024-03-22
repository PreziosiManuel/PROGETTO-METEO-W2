import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container className="text-white">
      <Row className="mt-5 rounded">
        <Col>
          <h2 className="display-3 mt-2 fw-medium">Benvenuto nel nostro sito meteorologico!</h2>
          <p className="display-6 fs-3 ">
            Esplora le previsioni più recenti, scopri le condizioni attuali e pianifica la tua giornata con fiducia.
            Siamo qui per fornirti le informazioni più precise e aggiornate sul tempo, ovunque tu sia. Che tu stia
            cercando il sole o ti prepari per le piogge, siamo qui per aiutarti a navigare attraverso le condizioni
            meteorologiche con facilità.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
