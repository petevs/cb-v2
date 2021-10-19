import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@mui/material";

const ProfileCard = ({ name, img }) => {

  return (
    <MyProfileCard>
      <Avatar />
      <div>
        <h5>Welcome, Guest</h5>
        <p>Sign up for full experience</p>
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
  
  & p {
    font-size: .75rem;
    text-decoration: underline;
    line-height: 1.25rem;
    color: #1976d2;
    font-weight: 500;
  }
`;