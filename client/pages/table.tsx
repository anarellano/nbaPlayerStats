"use client";

import React, { useEffect, useState } from "react";
import TeamDropDown from "./components/teamsDropdown";
import PositionDropDown from "./components/positionDropDown";

interface Player {
  player: string;
  position: string;
  age: number;
  team: string;
  gamesPlayed: number;
  gamesStarted: number;
  minutesPlayed: number;
  fieldGoals: number;
  fieldGoalAttempts: number;
  fieldGoalPercentage: number;
  threePointFieldGoals: number;
  threePointFieldGoalAttempts: number;
  threePointFieldGoalPercentage: number;
  twoPointFieldGoals: number;
  twoPointFieldGoalAttempts: number;
  twoPointFieldGoalPercentage: number;
  effectiveFieldGoalPercentage: number;
  freeThrows: number;
  freeThrowAttempts: number;
  freeThrowPercentage: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  totalRebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  pointsPerGame: number;
}

const table = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [nbaPlayer, setNbaPlayer] = useState("");
  const [page, setPage] = useState(0); // what page to start on
  const [limit, setLimit] = useState(10); // how many entries you want per page
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disablePreviousButton, setDisablePreviousButton] = useState(true);
  const [playerCount, setPlayerCount] = useState(0);
  const [team, setTeam] = useState(""); // keep track of what team you want to find
  const [position, setPosition] = useState(""); // position dropdown data
  console.log(position);

  const lastPage = Math.floor(playerCount / limit); // the last page
  console.log(team);
  // update URL
  // const updateUrl = (newLimit: number, newPage: number) => {
  //   const url = `${window.location.search}?pages=${newPage}&limit=${newLimit}`;
  //   window.history.pushState({}, "", url);
  // };

  //fetch the table data when program starts
  useEffect(() => {
    fetchPlayerData(page, limit, nbaPlayer, team, position);
  }, [page, team, position, nbaPlayer]);
  //
  const fetchPlayerData = async (
    page: number,
    limit: number,
    nbaPlayer: string,
    team: string,
    position: string
  ) => {
    try {
      let url = `http://localhost:8000/getPlayers?page=${page}&limit=${limit}`;

      if (nbaPlayer) {
        url += `&nbaPlayer=${nbaPlayer}`;
      }
      if (team && team !== "ALL") {
        url += `&team=${team}`;
      }
      if (position && position !== "ALL") {
        url += `&position=${position}`;
      }

      const response = await fetch(url);
      console.log(url);

      if (!response) {
        throw new Error("Could not get data", response);
      }

      const data = await response.json();

      setPlayers(data.response);
      setPlayerCount(data.countResponse);
    } catch (error) {
      console.error(error);
    }
  };

  // when I press next, I want the page to stop at the first row
  const handlePrevious = () => {
    if (page === 0) {
      return;
    }
    const previousePage = page - 1;
    setDisableNextButton(false);
    setPage(previousePage);
  };

  // when I press next, I want the page to stop at the last row
  const handleNext = () => {
    if (page === lastPage) {
      return;
    }
    const nextPage = page + 1;
    setDisablePreviousButton(false);
    setPage(nextPage);
  };

  // shows the range of your data below the table
  const pageRange = () => {
    const range = page * limit + limit;
    const stop = playerCount - (limit - 1);
    const starting = page * limit + 1;
    const start = () => {
      if (playerCount === 0) {
        return 0;
      }
      return Math.max(starting, 1);
    };

    const end = () => {
      if (playerCount === 0) {
        return 0;
      }
      return Math.max(Math.min(range, playerCount), 1);
    };

    return `${start()} - ${end()} / ${playerCount}`;
  };

  // buttons that needs to be pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPage(0);
      fetchPlayerData(page, limit, nbaPlayer, team, position);
    }
    if (e.key === "ArrowRight") {
      handleNext();
    }
    if (e.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  // search a player
  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(0);
    fetchPlayerData(page, limit, nbaPlayer, team, position);
  };

  //filter the table by team using dropdown
  const handleDropdownClick = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setPage(0);
    fetchPlayerData(page, limit, nbaPlayer, team, position);
  };

  const handlePositionClick = (selectedPosition: string) => {
    console.log(selectedPosition);

    setPosition(selectedPosition);
    setPage(0);
    fetchPlayerData(page, limit, nbaPlayer, team, position);
  };

  return (
    <div>
      <div className="searchBox d-flex justify-content-around">
        <div>
          <input
            type="text"
            value={nbaPlayer}
            onChange={(e) => setNbaPlayer(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <button type="button" onClick={(e) => handleSearchClick(e)}>
            Search
          </button>
        </div>
        <div>
          <TeamDropDown direction="down" onClick={handleDropdownClick} />
        </div>
        <div>
          <PositionDropDown onClick={handlePositionClick} />
        </div>
      </div>

      <table className="nbaPlayers">
        <thead>
          <tr>
            <th>Player</th>
            <th>Pos</th>
            <th>Age</th>
            <th>Tm</th>
            <th>G</th>
            <th>GS</th>
            <th>MP</th>
            <th>FG</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3P</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>2P</th>
            <th>2PA</th>
            <th>2P%</th>
            <th>eFG%</th>
            <th>FT</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>ORB</th>
            <th>DRB</th>
            <th>TRB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr key={i}>
              <td>{player.player}</td>
              <td>{player.position}</td>
              <td>{player.age}</td>
              <td>{player.team}</td>
              <td>{player.gamesPlayed}</td>
              <td>{player.gamesStarted}</td>
              <td>{player.minutesPlayed}</td>
              <td>{player.fieldGoals}</td>
              <td>{player.fieldGoalAttempts}</td>
              <td>{player.fieldGoalPercentage}</td>
              <td>{player.threePointFieldGoals}</td>
              <td>{player.threePointFieldGoalAttempts}</td>
              <td>{player.threePointFieldGoalPercentage}</td>
              <td>{player.twoPointFieldGoals}</td>
              <td>{player.twoPointFieldGoalAttempts}</td>
              <td>{player.twoPointFieldGoalPercentage}</td>
              <td>{player.effectiveFieldGoalPercentage}</td>
              <td>{player.freeThrows}</td>
              <td>{player.freeThrowAttempts}</td>
              <td>{player.freeThrowPercentage}</td>
              <td>{player.offensiveRebounds}</td>
              <td>{player.defensiveRebounds}</td>
              <td>{player.totalRebounds}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.blocks}</td>
              <td>{player.turnovers}</td>
              <td>{player.personalFouls}</td>
              <td>{player.pointsPerGame}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button
          onClick={() => handlePrevious()}
          disabled={disablePreviousButton || page === 0}
        >
          {" "}
          PREVIOUS{" "}
        </button>
        <button
          onClick={() => handleNext()}
          disabled={disableNextButton || lastPage === page}
          onKeyDown={() => handleKeyDown}
        >
          {" "}
          NEXT{" "}
        </button>
      </div>
      <div className="buttons-container"> {pageRange()}</div>
    </div>
  );
};

export default table;
