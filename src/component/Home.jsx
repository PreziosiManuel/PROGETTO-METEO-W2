import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ApiKey } from "../api";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDateTime = now.toLocaleDateString("it-IT", options);
    setCurrentDateTime(formattedDateTime);
  };

  useEffect(() => {
    getCurrentDateTime();

    const fetchWeatherData = async () => {
      const cities = ["Deruta", "Perugia", "Firenze", "Milano"];

      const fetchDataPromises = cities.map(async (city) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&lang=it&units=metric`
          );

          if (!response.ok) {
            throw new Error("Errore nel recupero dei dati");
          }

          const data = await response.json();

          const temperatureCelsius = data.main.temp.toFixed(1);
          const minTemperatureCelsius = data.main.temp_min.toFixed(1);
          const maxTemperatureCelsius = data.main.temp_max.toFixed(1);

          const weatherDataItem = {
            ...data,
            main: {
              ...data.main,
              temp: temperatureCelsius,
              temp_min: minTemperatureCelsius,
              temp_max: maxTemperatureCelsius,
            },
          };

          return weatherDataItem;
        } catch (error) {
          return null;
        }
      });

      const fetchedData = await Promise.all(fetchDataPromises);
      setWeatherData(fetchedData.filter((data) => data !== null));
    };

    fetchWeatherData();
  }, []);

  return (
    <Container className="container text-white">
      <Container className="my-5 ">
        <h3 className="mt-5 mb-3">Meteo attuale:</h3>
        <Row className="my-2">
          {weatherData.map((data, index) => (
            <div key={index} className="shadow-lg my-2" style={{ borderRadius: "10px", border: "1px solid white" }}>
              <Row className="d-flex align-items-center justify-content-center">
                <Col>
                  <img
                    className="img-fluid"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt="img"
                  />
                </Col>
                <Col>
                  <h4 className="fs-2">{data.name}</h4>
                  <p>
                    Temperatura attuale: <strong>{data.main.temp}°C</strong>
                  </p>
                </Col>
                <Col className="d-none d-md-block">
                  <p>Condizioni del cielo:</p>
                  <span>
                    <strong>{data.weather[0].description}</strong>
                  </span>
                  <p>{data.rain}</p>
                </Col>
                <Col className="d-none d-md-block">
                  <p>
                    Temperatura minima : <strong>{data.main.temp_min}°C</strong>
                  </p>
                </Col>

                <Col className="d-none d-lg-block">
                  <p>
                    Temperatura massima: <strong>{data.main.temp_max}°C</strong>
                  </p>
                </Col>
                <Col className="d-none d-lg-block">
                  <p>Vento:</p>
                  <p>
                    <strong>{data.wind.speed} km/h</strong>
                  </p>
                </Col>
              </Row>
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
