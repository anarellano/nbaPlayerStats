import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
interface dropdownProps {
  direction?: "up" | "down" | "left" | "right";
  onClick: (acronym: string) => void;
}
function dropdown({ direction, onClick, ...args }: dropdownProps) {
  const nbaTeams = [
    { acronym: "ALL", name: "All NBA Team" },
    { acronym: "ATL", name: "Atlanta Hawks" },
    { acronym: "BOS", name: "Boston Celtics" },
    { acronym: "BRK", name: "Brooklyn Nets" },
    { acronym: "CHO", name: "Charlotte Hornets" },
    { acronym: "CHI", name: "Chicago Bulls" },
    { acronym: "CLE", name: "Cleveland Cavaliers" },
    { acronym: "DAL", name: "Dallas Mavericks" },
    { acronym: "DEN", name: "Denver Nuggets" },
    { acronym: "DET", name: "Detroit Pistons" },
    { acronym: "GSW", name: "Golden State Warriors" },
    { acronym: "HOU", name: "Houston Rockets" },
    { acronym: "IND", name: "Indiana Pacers" },
    { acronym: "LAC", name: "Los Angeles Clippers" },
    { acronym: "LAL", name: "Los Angeles Lakers" },
    { acronym: "MEM", name: "Memphis Grizzlies" },
    { acronym: "MIA", name: "Miami Heat" },
    { acronym: "MIL", name: "Milwaukee Bucks" },
    { acronym: "MIN", name: "Minnesota Timberwolves" },
    { acronym: "NOP", name: "New Orleans Pelicans" },
    { acronym: "NYK", name: "New York Knicks" },
    { acronym: "OKC", name: "Oklahoma City Thunder" },
    { acronym: "ORL", name: "Orlando Magic" },
    { acronym: "PHI", name: "Philadelphia 76ers" },
    { acronym: "PHX", name: "Phoenix Suns" },
    { acronym: "POR", name: "Portland Trail Blazers" },
    { acronym: "SAC", name: "Sacramento Kings" },
    { acronym: "SAS", name: "San Antonio Spurs" },
    { acronym: "TOR", name: "Toronto Raptors" },
    { acronym: "UTA", name: "Utah Jazz" },
    { acronym: "WAS", name: "Washington Wizards" },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("Select Team");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = (team: string) => {
    setSelectedTeam(team); // updates what the drop down looks like

    // Check if 'ALL' is selected
    if (team === "ALL") {
      onClick("");
    } else {
      // Handle selection for specific teams
      onClick(team);
    }
  };

  return (
    <div className="">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret>{selectedTeam}</DropdownToggle>
        <DropdownMenu {...args}>
          {nbaTeams.map((nbaTeam) => (
            <DropdownItem
              key={nbaTeam.acronym}
              onClick={() => handleClick(nbaTeam.acronym)}
            >
              {nbaTeam.acronym}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default dropdown;
