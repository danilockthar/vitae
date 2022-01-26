import { gql } from "graphql-request";
import { graphQLClient } from "../lib/graphql-client";

export const getPostByID = async (id: string) => {
  const query = gql`
    query findPostByID($id: ID!) {
      findPostByID(id: $id) {
        _id
        title
        excerpt
        created_at
        updated_at
        isPublished
        show
        author {
          _id
          email
          name
          authId
        }
        tags {
          tag
        }
        content {
          data {
            caption
            withBorder
            withBackground
            code
            stretched
            text
            style
            items
            file {
              url
            }
            level
          }
          type
        }
      }
    }
  `;

  const variables = {
    id,
  };

  const response = await graphQLClient.request(query, variables);

  return response.findPostByID;
};

export const createAnUser = async (email, name, authId, plan) => {
  let vacio = " ";
  const query = `mutation createAnUsuario($email: String!, $name: String!, $authId: String!, $plan: Plan!) {
        createUser(data: {email: $email, name:$name, role: AUTHOR, authId: $authId, plan: $plan}){
            _id
            name
            email
            authId,
            plan
          }
  }`;
  const res = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_KEY}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { email, name, authId, plan },
    }),
  });
  const data = await res.json();
  return { data: data };
};
