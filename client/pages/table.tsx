"use client";

import React, { useEffect, useState } from "react";
import TeamDropDown from "./components/teamsDropdown";
import PositionDropDown from "./components/positionDropDown";
import { gql, useQuery } from "@apollo/client";

const GET_PLAYERS_QUERY = gql`
  query GetAllPlayers(
    $team: String
    $position: String
    $player: String
    $limit: Int
    $offset: Int
  ) {
    getAllPlayers(
      team: $team
      position: $position
      player: $player
      limit: $limit
      offset: $offset
    ) {
      total
      players {
        player
        position
        age
        team
        gamesPlayed
        gamesStarted
        minutesPlayed
        fieldGoals
        fieldGoalAttempts
        fieldGoalPercentage
        threePointFieldGoals
        threePointFieldGoalAttempts
        threePointFieldGoalPercentage
        twoPointFieldGoals
        twoPointFieldGoalAttempts
        twoPointFieldGoalPercentage
        effectiveFieldGoalPercentage
        freeThrows
        freeThrowAttempts
        freeThrowPercentage
        offensiveRebounds
        defensiveRebounds
        totalRebounds
        assists
        steals
        blocks
        turnovers
        personalFouls
        pointsPerGame
      }
    }
  }
`;

const table = () => {
  const [page, setPage] = useState(0); // what page to start on
  const [limit, setLimit] = useState(5); // how many entries you want per page
  const [playerCount, setPlayerCount] = useState(0);
  const [team, setTeam] = useState(""); // keep track of what team you want to find
  const [position, setPosition] = useState(""); // position dropdown data
  const [SearchPlayer, setSearchPlayer] = useState(""); // search nbaPlayer
  const [players, setPlayers] = useState([]); // mapped data
  
  const lastPage = Math.floor(playerCount / limit); // the last page

  const { data } = useQuery(GET_PLAYERS_QUERY, {
    variables: {
      team,
      position,
      player: SearchPlayer,
      limit,
      offset: page,
    }, // values comes from hooks
  });

  useEffect(() => {
    if (data) {
      setPlayerCount(data.getAllPlayers.total);
      setPlayers(data.getAllPlayers.players); // update for maps
    }
  }, [data]);

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  // shows the range of your data below the table
  const pageRange = () => {
    const range = page * limit + limit;
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
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setPage(0);
      }
      if (e.key === "ArrowRight") {
        if(page < lastPage){
          handleNext()}
      }
      if (e.key === "ArrowLeft") {
        if (page > 0){
        handlePrevious()};
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [page]);
  
  // search a player
  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(0);
  };

  //filter the table by team using dropdown
  const handleDropdownClick = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setPage(0);
  };

  const handlePositionClick = (selectedPosition: string) => {
    setPosition(selectedPosition);
    setPage(0);
  };

  return (
    <div>
      <div className="searchBox d-flex justify-content-around">
        <div>
          <input
            type="text"
            value={SearchPlayer}
            onChange={(e) => setSearchPlayer(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
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
        <div><input placeholder="limit per page"type="text" onChange={e=>(setLimit(Number(e.target.value)))}/></div>
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
          {/* added i because there are duplicates */}
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
        <button onClick={() => handlePrevious()} disabled={page === 0} >
          PREVIOUS
        </button>
        <button
          onClick={() => handleNext()}
          disabled={lastPage === page}
          // onKeyDown={handleKeyDown}
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
