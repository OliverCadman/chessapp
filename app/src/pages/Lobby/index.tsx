import React from "react";
import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import { useLoginStore } from "../../store/auth";
import useLobbySocket from "../../hooks/LobbySocket";
import LogoHero from "../../components/Logo/LogoHero";

const Lobby = () => {
  const tokens = useLoginStore((state) => state.tokens);
  const socket = useLobbySocket(tokens.accessToken);

  console.log("TOKENS IN LOBBY:", tokens);

  return (
    <FullHeightContainer>
      <div className="hero flex centered h-100">
        <section className="player-list">
          <h1>Players Online</h1>
          <ul className="player-list__grid">
            {Array.from(Array(6).keys()).map((_, idx) => {
              return (
                <li>
                  {idx % 2 == 0 ? (
                    <div className="player-list__item">
                      <div className="user-details">
                        <p className="user">Irena Yanachkova</p>
                        <p className="last-seen">Last seen: 5m ago</p>
                      </div>
                      <div className="player-list__challenge-btn">
                        <button>Challenge Irena</button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </FullHeightContainer>
  );
};

export default Lobby;
