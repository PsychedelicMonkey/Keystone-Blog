import React from 'react';
import { Container } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

import PostCard from './PostCard';

const Category = (props) => {
  const { name } = props.match.params;

  const GET_CATEGORIES = gql`
    query {
      allPosts(
        sortBy: createdAt_DESC
        where: { categories_some: { name_contains: "${name}" } }
      ) {
        id
        title
        author {
          name
        }
        categories(sortBy: name_ASC) {
          name
        }
        unsplashCoverImage {
          publicUrl
          user {
            name
            url
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading....</p>;
  if (error) return <h1>Error</h1>;

  const { allPosts } = data;

  return (
    <Container>
      <h1>{name}</h1>
      {allPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </Container>
  );
};

export default Category;
