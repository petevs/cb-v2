import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileCard = ({ name, img, isAnonymous }) => {

  return (
    <MyProfileCard>
      <Link to='/account'><Avatar /></Link>
      <div>
        <h5>Welcome, {name}</h5>
        {isAnonymous &&
          <MyLink to='/signup'>Sign up for full experience</MyLink>
        }
      </div>
    </MyProfileCard>
  );
};

export default ProfileCard;

const MyProfileCard = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 40px;
  background-color: #f2f3f5;
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  margin: 1rem;
`;

const MyLink = styled(Link)`
  color: inherit;
  font-size: .75rem;
  &:hover{
    color: #1976d2;
  }
`