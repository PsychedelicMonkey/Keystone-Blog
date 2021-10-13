import React from 'react';
import { Container } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

import PostCard from './PostCard';

const GET_POSTS = gql`
  query {
    allPosts(sortBy: createdAt_DESC) {
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
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading....</p>;
  if (error) return <h1>Error</h1>;

  const { allPosts } = data;

  return (
    <Container>
      {allPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </Container>
  );
};

export default Home;
