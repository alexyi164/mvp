import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default function ViewDropdown({ view, viewSelected }) {
  if (view === 'totalCases') {
    view = 'Total Cases';
  } else if (view === 'totalDeaths') {
    view = 'Total Deaths';
  } else if (view === 'byRace') {
    view = 'By Race';
  }
  return(
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {view}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => viewSelected('totalCases')}>Total Cases</Dropdown.Item>
        <Dropdown.Item onSelect={() => viewSelected('totalDeaths')}>Total Deaths</Dropdown.Item>
        <Dropdown.Item onSelect={() => viewSelected('byRace')}>By Race</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}