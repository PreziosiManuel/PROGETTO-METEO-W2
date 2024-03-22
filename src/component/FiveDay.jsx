import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ApiKey } from "../api";

const FiveDay = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const formatDateTime = (dateTimeString) => {
    const optionsDay = {
      weekday: "long",
    };
    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateTimeString);

    const dayOfWeek = date.toLocaleString("it-IT", optionsDay);
    const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const time = date.toLocaleString("it-IT", optionsTime);

    return { dayOfWeek: capitalizedDay, time };
  };

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&lang=it&units=metric`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati meteorologici");
      }

      const data = await response.json();

      // Filtra i dati per ottenere solo quelli ogni 6 ore
      const filteredData = data.list.filter((item, index) => index % 4 === 0);

      const extractedData = {
        city: data.city.name,
        list: filteredData.map((item) => {
          const { dayOfWeek, time } = formatDateTime(item.dt_txt);
          return {
            dayOfWeek,
            time,
            description: item.weather[0].description,
            temperature: item.main.temp.toFixed(1),
            minTemperature: item.main.temp_min.toFixed(1),
            maxTemperature: item.main.temp_max.toFixed(1),
            pressure: item.main.pressure,
            windSpeed: item.wind.speed,
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            rain: item.rain ? item.rain["12h"] : null,
          };
        }),
      };

      setWeatherData(extractedData);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteorologici:", error.message);
    }
  };

  return (
    <Container className="container text-white">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <p className="display-6 fs-3">Controlla il Meteo per i prossimi giorni</p>
          <Form.Group controlId="formCity">
            <Form.Label className="display-6 my-5">Inserisci la città</Form.Label>
            <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Button className="border-white text-white shadow-lg mt-5 mb-4" variant="transparent" onClick={getWeather}>
            Ricerca
          </Button>
        </Col>
      </Row>

      {weatherData && (
        <Container>
          <Row>
            <Col>
              <h3>Previsioni Meteo per</h3>
              <h2 className="display-4 fw-bold">{weatherData.city}:</h2>
              {weatherData.list.map((item, index) => (
                <div className=" shadow-lg border border-light rounded my-2" key={index}>
                  <Row className=" g-3 my-2 d-flex align-items-center">
                    <Col>
                      <img className="img-fluid" src={item.icon} alt="icon" />
                    </Col>
                    <Col>
                      <h4 className="fs-2" style={{ fontWeight: "bold" }}>
                        {item.dayOfWeek}
                        <p className="fs-5 mt-2">Ore: {item.time}</p>
                      </h4>
                    </Col>
                    <Col className="d-none d-md-block">
                      <p className="text-break fs-5 my-0">Condizioni del cielo:</p>
                      <p className="fs-4 fw-bold py-0 my-0">{item.description}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                      <p className="text-break fs-5 my-0">Temperatura:</p>
                      <p className="fs-4 fw-bold py-0 my-0">{item.temperature} °C</p>
                    </Col>
                    <Col className="d-none d-lg-block">
                      <p className="text-break fs-6 my-0">Temperatura massima:</p>
                      <p>
                        <p className="fs-5 fw-bold py-0 my-0">{item.maxTemperature}°C</p>
                      </p>
                      <p className="text-break fs-6 my-0">Temperatura minima:</p>
                      <p>
                        <p className="fs-5 fw-bold py-0 my-0">{item.minTemperature}°C</p>
                      </p>
                    </Col>
                    <Col className="d-none d-lg-block">
                      <p className="text-break fs-5 my-0">Vento:</p>
                      <p className="fs-4 fw-bold py-0 my-0">{item.windSpeed} km/h</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default FiveDay;
