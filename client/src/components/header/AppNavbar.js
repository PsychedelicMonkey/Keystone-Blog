import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
  query {
    allCategories(sortBy: name_ASC) {
      name
    }
  }
`;

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading....</p>;
  if (error) return <h1>Error</h1>;

  const { allCategories } = data;

  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <Container>
        <NavbarBrand tag={Link} to="/">
          Blog
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
                {allCategories.map(({ name }) => (
                  <DropdownItem tag={Link} to={`/categories/${name}`}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
