import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Card.module.css";
import { IoLogoGithub } from "react-icons/io";
import Loader from "../../assets/FruitsGif.gif";

export default function Card() {
  //state inicial
  const initialFruitData = {
    nome: "morango",
    id: 1,
    calorias: 80,
    proteinas: 5,
    carboidratos: 20,
    img: "https://3.bp.blogspot.com/-8Cc6Gn2Wf7Y/VIi8k6ZrHPI/AAAAAAAAWlY/4zpKekL7R-g/s1600/04.png",
    color: "#BE2222",
    vitaminas: ["A", "C", "D", "E", "K"],
  };

  const [data, setData] = useState([initialFruitData]);

  //state da api
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [buttonText, setButtonText] = useState("");

  //loaders
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  //hook de responsividade
  useEffect(() => {
    function updateButtonText() {
      if (window.innerWidth < 600) {
        setButtonText("Aperte e troque de fruta");
      } else {
        setButtonText(
          <>
            <span>Aperte</span>
            <span style={{ color: "#BE2222" }}> S </span>
            <span style={{ color: "#BEAF22" }}> P</span>
            <span style={{ color: "#25BE22" }}> A</span>
            <span style={{ color: "#2228BE" }}> C</span>
            <span style={{ color: "#BE229C" }}> E </span>
            <span> para trocar de fruta</span>
          </>
        );
      }
    }
    updateButtonText();

    window.addEventListener("resize", updateButtonText);
    return () => {
      window.removeEventListener("resize", updateButtonText);
    };
  }, []);

  //função de randomicidade de frutas
  const randomFruit = () => {
    if (data.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setSelectedFruit(data[randomIndex]);
  };
  //hook de loader da imagem
  useEffect(() => {
    if (!selectedFruit) {
      return;
    }

    const img = new Image();
    img.src = selectedFruit.img;
    setLoading(true);
    setImageLoaded(false);

    const loaderTimeout = setTimeout(() => {
      setLoading(false);
      setImageLoaded(true);
    }, 2000); 

    img.onload = () => {
      if(img.complete === true){
        clearTimeout(loaderTimeout);
        setLoading(false);
        setImageLoaded(true);
      }
      else{
        loaderTimeout
      }
    }
  
    img.onerror = (error) => {
      clearTimeout(loaderTimeout); 
      console.error("Error loading image:", error);
      setLoading(false);
      setImageLoaded(false);
    };
  }, [selectedFruit]);

  //Consumo da API
  useEffect(() => {
    axios
      .get("http://localhost:3000/frutas")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados da API:", error);
      });
  }, []);

  useEffect(() => {
    randomFruit();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fruit}>
        {selectedFruit !== null ? (
            <>
              <h2 style={{ color: selectedFruit.color }}>
                {selectedFruit.nome}
              </h2>
              {loading ? (
                <div className={styles.containerGif}>
                  <img
                    className={styles.fruitGif}
                    src={Loader}
                    alt="Loading..."
                  />
                </div>
              ) : (
                imageLoaded && (
                  <img
                    className={styles.fruitImage}
                    src={selectedFruit.img}
                    alt={selectedFruit.nome}
                  />
                )
              )}
              <div className={styles.vitamine}>
                <p style={{ color: selectedFruit.color }}>Vitaminas</p>
                <ul>
                  {selectedFruit.vitaminas.map((vitamina, index) => (
                    <li
                      style={{ backgroundColor: selectedFruit.color }}
                      key={index}
                    >
                      {vitamina}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: "#000" }}>Nenhuma fruta selecionada</h2>
            </>
          )}
        </div>
        <div className={styles.infoNutrition}>
          <table>
            <thead>
              <tr className={styles.headerInfoNutritional}>
                <th
                  style={{
                    color:
                      selectedFruit !== null ? selectedFruit.color : "#000",
                  }}
                >
                  Informações nutricionais
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedFruit !== null && (
                <>
                  <tr>
                    <th>Calorias</th>
                    <td style={{ color: selectedFruit.color }}>
                      {selectedFruit.calorias}
                    </td>
                  </tr>
                  <tr>
                    <th>Proteínas</th>
                    <td style={{ color: selectedFruit.color }}>
                      {selectedFruit.proteinas}
                    </td>
                  </tr>
                  <tr>
                    <th>Carboidratos</th>
                    <td style={{ color: selectedFruit.color }}>
                      {selectedFruit.carboidratos}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.containerButton}>
        <button onClick={randomFruit}>{buttonText}</button>
      </div>
      <div>
        {selectedFruit !== null ? (
          <>
            <div
              style={{ color: selectedFruit.color }}
              className={styles.github}
            >
              <IoLogoGithub className={styles.icon} />
              <a
                href="github.com/AlanDorneles"
                style={{ color: selectedFruit.color }}
              >
                github.com/AlanDorneles
              </a>
            </div>
          </>
        ) : (
          <>
            <div
              style={{ color: initialFruitData.color }}
              className={styles.github}
            >
              <IoLogoGithub className={styles.icon} />
              <a
                href="github.com/AlanDorneles"
                style={{ color: initialFruitData.color }}
              >
                github.com/AlanDorneles
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
