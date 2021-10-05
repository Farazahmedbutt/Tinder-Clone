import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import { useEffect } from "react";
import axios from "./axios";
function TinderCards() {
  const swiped = (direction, nameToDelete) => {
    console.log(`${nameToDelete} removed`);
  };
  const outOfFrame = (name) => {
    console.log(`${name} has left the screen`);
  };
  const [people, setPeople] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/tinder/cards");
      setPeople(req.data);
    }
    fetchData();
  }, []);
  console.log(people);
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => {
          return (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, person.name)}
              onCardLeftScreen={() => outOfFrame(person.name)}
            >
              <div
                className="card"
                style={{ backgroundImage: "url(" + person.imgUrl + ")" }}
              >
                <h3>{person.name}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
}

export default TinderCards;
