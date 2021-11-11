import React from "react";
import styled from "@emotion/styled";
import Location from "./location";
import Conditions from "./conditions";
import Icon from "./icon";
import { motion } from "framer-motion";

function WeatherCard({ temp, condition, city, country }) {
  let highColor = 0;
  let lowColor = 0;
  //const red = 200;
  /*let temp = 20 if used temp 
  in place place of props.temp in the below line of code;*/
  /*let highColor = (1 - (props.temp - 12) / 28) * 255;
  let lowColor = highColor - 150;*/
  let bg = null;
  if (temp > 12) {
    //This is for hot weather
    highColor = (1 - (temp - 12) / 28) * 255;
    lowColor = highColor - 150;
    bg = `linear-gradient(
      to top,
      rgb(255, ${highColor}, 0),
      rgb(255, ${lowColor}, 0)
    )`;
  } else if (temp <= 12) {
    //This is for cold weather
    highColor = (1 - (temp + 20) / 32) * 255;
    lowColor = highColor - 150;
    bg = `linear-gradient(
      to top,
      rgb(0, ${highColor}, 255),
      rgb(0, ${lowColor}, 255)
    )`;
  }
  const Card = styled.div`
    margin: 0 auto;
    background: ${bg};
    width: 200px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
  `;
  //const img1 = "./cloudsimg.jpg"
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Card>
        <Location city={city} country={country} />
        <Icon condition={condition} />
        <Conditions temp={temp} condition={condition} />
      </Card>
    </motion.div>
  );
}

export default WeatherCard;
