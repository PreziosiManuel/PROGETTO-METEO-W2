import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className=" footer bg-trasparent border-top border-white text-center text-white mt-5">
      <p className="m-0 pt-3">
        Grazie per aver scelto di fidarti di noi per le tue informazioni sul meteo. Arrivederci alla nostra comunità
        meteorologica!
      </p>
      <p className="m-0 py-3">
        Il sottoscritto non si assume responsabilità su eventuali tornadi, alluvioni o catastrofi inaspettati! xD
      </p>
      <p className="m-0 py-3">
        &copy; Previsioni meteo. Tutti i diritti riservati. Il sottoscritto non si assume responsabilità su eventuali
        precipitazioni/tornadi/alluvioni inaspettati :D{" "}
      </p>
    </Container>
  );
};

export default Footer;
