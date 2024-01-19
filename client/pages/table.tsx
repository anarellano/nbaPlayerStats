"use client";

import React, { useEffect, useState } from "react";
import TeamDropDown from "./components/teamsDropdown";
import PositionDropDown from "./components/positionDropDown";
import { gql, useQuery } from "@apollo/client";

const GET_PLAYERS_QUERY = gql`
  query GetAllPlayers($search: Search, $limit: Int, $offset: Int) {
  getAllPlayers(search: $search, limit: $limit, offset: $offset) {
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
  const [playerCount, setPlayerCount] = useState(0); //keep track of howmany entries there are
  const [team, setTeam] = useState(""); // keep track of what team you want to find
  const [position, setPosition] = useState(""); // position dropdown data
  const [searchPlayer, setSearchPlayer] = useState(""); // search nbaPlayer
  const [players, setPlayers] = useState([]); // mapped data
  const [queryPlayer, setQueryPlayer]= useState("")
  
  let limit = 5 // Entries per page
  const lastPage = Math.floor(playerCount / limit); // the last page

  const { data, loading, error} = useQuery(GET_PLAYERS_QUERY, {
    variables: {
      search:{
        team,
        position,
        player: queryPlayer,
      }, 
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
  
    //remove listner
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [page]);
   
  
  // search a player
  const handleSearchClick = () => {
    setQueryPlayer(searchPlayer)
    setPage(0);
    
  };
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };


  //filter the table by team using dropdown
  const handleDropdownClick = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setPage(0);
  };

  const handlePositionClick = (selectedPosition: string) => {
    console.log("im being hit");
    
    setPosition(selectedPosition);
    setPage(0);
  };

  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }
  if (error) {
    return <h1> Could Not Grab Data...</h1>;
  }
  console.log("searchPlayer",searchPlayer);
  
  return (
    <div>
      <div className="searchBox d-flex justify-content-around">
      <div>
        <input
          type="text"
          value={searchPlayer}
          onChange={(e) => setSearchPlayer(e.target.value)}
          onKeyDown={pressEnter}
        />
        <button type="button" onClick={handleSearchClick}>
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
          {/* added i because there are duplicates */}
          {players.map((player) => (
            <tr key={player.player + player.team + player.pointsPerGame}>
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
