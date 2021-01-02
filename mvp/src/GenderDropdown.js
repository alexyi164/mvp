import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default function GenderDropdown() {
  return(
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please Select Gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Men</Dropdown.Item>
        <Dropdown.Item>Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}