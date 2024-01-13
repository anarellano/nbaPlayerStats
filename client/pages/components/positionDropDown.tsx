import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

interface dropdownProps {
  //   direction?: "up" | "down" | "left" | "right";
  onClick: (position: string) => void;
}
function positionDropDown({ onClick, ...args }: dropdownProps) {
  const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [positionSelected, setPositionSeleceted] = useState("Select Position");

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleClick = (position: string) => {
    setPositionSeleceted(position);
    onClick(position);
  };
  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret>{positionSelected}</DropdownToggle>
        <DropdownMenu {...args}>
          {positions.map((position) => (
            <DropdownItem key={position} onClick={() => handleClick(position)}>
              {position}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default positionDropDown;
