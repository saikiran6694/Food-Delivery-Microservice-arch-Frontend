"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ACTIVATION_USER = gql`
  mutation ActivateUser($activationToken: String!, $activationCode: String!) {
    activateUser(
      activationInput: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      user {
        name
        email
        phone_number
        createdAt
      }
    }
  }
`;
