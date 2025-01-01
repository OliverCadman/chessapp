import React, { useEffect } from "react";
import FullHeightContainer from "../../components/FullHeightContainer/FullHeightContainer";
import ChallengeModal from "../../components/ChallengeModal/ChallengeModal";
import { useLoginStore } from "../../store/auth";
import useLobbySocket from "../../hooks/useLobbySocket";
import { useLobbyStore } from "../../store/lobby";
import { useParams } from "react-router-dom";
import DateParser from "../../utils/dateParser";
import usePlayerList from "../../hooks/usePlayerList";
import useTokenRefresh from "../../hooks/useTokenRefresh";
import { APIClient } from "../../api/client";

interface PlayerObject {
  user: {
    id: number;
    email: string;
  };
  last_seen: string;
}

const Lobby = () => {
  const { lobbyId } = useParams();

  let userGroupId: string;

  const tokens = useLoginStore((state) => state.tokens);
  const userEmail = useLoginStore((state) => state.loginInputs[0].inputValue);

  const challengeModalProps = useLobbyStore(
    (state) => state.challengeModalProps,
  );

  const challengeOptions = useLobbyStore((state) => state.challengeOptions);

  const players = useLobbyStore((state) => state.players);
  const playerListPayload = useLobbyStore((state) => state.playerListPayload);

  const socket = useLobbySocket(lobbyId, tokens.accessToken);

  useEffect(() => {
    if (socket.lastMessage) {
      const data = JSON.parse(socket.lastMessage.data);

      switch (data.type) {
        case "user.get_group_name":
          {
            userGroupId = data.data.user_group_name;

            useLobbyStore.setState((prevState) => {
              return {
                ...prevState,
                userGroupId,
              };
            });

            const playerListPayload = {
              group_name: userGroupId,
              room_name: `room_${lobbyId}`,
              type: "player.list",
              data: {
                current_user_email: userEmail,
              },
            };

            useLobbyStore.setState((prevState) => {
              return {
                ...prevState,
                playerListPayload,
              };
            });
          }
          break;
      }
    }
  }, [socket.lastMessage]);

  useEffect(() => {
    if (!playerListPayload) return;

    socket.sendMessage(JSON.stringify(playerListPayload));

    const LIST_SCHEDULE = 10000;
    const interval = setInterval(() => {
      console.log("listing...");
      socket.sendMessage(JSON.stringify(playerListPayload));
    }, LIST_SCHEDULE);

    return () => clearInterval(interval);
  }, [playerListPayload]);

  useEffect(() => {
    if (socket.lastMessage) {
      const data = JSON.parse(socket.lastMessage.data);

      switch (data.type) {
        case "player.list":
          {
            useLobbyStore.setState((prevState) => {
              return {
                ...prevState,
                players: data.data.players.map((player: PlayerObject) => {
                  const parsedDate = new DateParser(
                    new Date(player.last_seen),
                  ).parseDate();
                  return {
                    ...player,
                    lastSeen: {
                      dateUnit: parsedDate?.dateUnit,
                      timeDiff: parsedDate?.timeDiff,
                    },
                  };
                }),
              };
            });
          }
          break;
        case "lobby.challenge":
          {
            console.log("LOBBY CHALLENGE:", data);
          }
          break;
        default:
          return;
      }
    }
  }, [socket.lastMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      type: "lobby.challenge",
      group_name: `user_${challengeModalProps.opponentId}`,
      data: {
        colour: challengeOptions.color,
        timeControl: challengeOptions.timeControls.minutesPerSide,
        increment: challengeOptions.timeControls.increment,
      },
    };

    socket.sendMessage(JSON.stringify(payload));

    useLobbyStore.setState((prevState) => {
      if (!prevState.challengeModalProps.opponentId) return prevState;
      else
        return {
          ...prevState,
          challengeModalProps: {
            ...prevState.challengeModalProps,
            playersChallenged: [
              ...prevState.challengeModalProps.playersChallenged,
              prevState.challengeModalProps.opponentId,
            ],
          },
        };
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target;
    const elemId = elem.id;
    const elemValue = elem.value;

    useLobbyStore.setState((prevState) => {
      return {
        ...prevState,
        challengeOptions: {
          ...prevState.challengeOptions,
          timeControls: {
            minutesPerSide:
              elemId === "minutes-per-side"
                ? elemValue
                : prevState.challengeOptions.timeControls.minutesPerSide,
            increment:
              elemId === "increment"
                ? elemValue
                : prevState.challengeOptions.timeControls.increment,
          },
        },
      };
    });
  };

  const handleColorChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget as HTMLDivElement;
    const input = elem.children[0] as HTMLInputElement;

    useLobbyStore.setState((prevState) => {
      return {
        ...prevState,
        challengeOptions: {
          ...prevState.challengeOptions,
          color: input.value,
        },
      };
    });
  };

  return (
    <FullHeightContainer>
      <div
        className={`hero flex centered h-100 ${challengeModalProps?.showChallengeModal ? "relative" : ""}`}
      >
        <section className="player-list">
          <h1>Players Online</h1>
          <ul className="player-list__grid">
            {players &&
              players.map((player, idx) => {
                return (
                  <li key={player.user.id}>
                    {idx % 2 == 0 ? (
                      <div className="player-list__item">
                        <div className="user-details">
                          <p className="user">{player.user.email}</p>
                          <p className="last-seen">
                            {player.lastSeen.timeDiff ? (
                              `Last seen: ${player.lastSeen.timeDiff}
                            ${player.lastSeen.dateUnit} ago`
                            ) : (
                              <>
                                <span className="online"></span>
                                Online
                              </>
                            )}
                          </p>
                        </div>
                        <div className="player-list__challenge-btn">
                          <button
                            onClick={() =>
                              useLobbyStore.setState((prevState) => {
                                return {
                                  ...prevState,
                                  challengeModalProps: {
                                    ...prevState.challengeModalProps,
                                    showChallengeModal:
                                      !prevState?.challengeModalProps
                                        .showChallengeModal,
                                    opponentId: player.user.id,
                                    opponentName: player.user.email,
                                  },
                                };
                              })
                            }
                          >
                            Challenge {player.user.email}
                          </button>
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
      {challengeModalProps?.showChallengeModal ? (
        <ChallengeModal
          color={challengeOptions.color}
          handleRangeChange={handleRangeChange}
          minutesPerSide={challengeOptions.timeControls.minutesPerSide}
          increment={challengeOptions.timeControls.increment}
          playerName={challengeModalProps.opponentName}
          playerId={challengeModalProps.opponentId}
          currentPlayersChallenged={challengeModalProps.playersChallenged}
          handleColorChange={handleColorChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </FullHeightContainer>
  );
};

export default Lobby;
