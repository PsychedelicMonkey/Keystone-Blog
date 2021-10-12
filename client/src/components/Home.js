import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

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
        <Card key={post.id} className="mb-3">
          {post.unsplashCoverImage ? (
            <CardImg
              top
              width="100%"
              src={post.unsplashCoverImage.publicUrl}
              alt=""
            />
          ) : null}
          <CardBody>
            {post.categories.map(({ name }) => (
              <Link to={`/categories/${name}`}>
                <Badge pill className="mr-1 mb-3">
                  {name}
                </Badge>
              </Link>
            ))}
            <CardTitle tag="h4">{post.title}</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">
              {post.author.name}
            </CardSubtitle>
            <Link to={`/posts/${post.id}`} className="btn btn-primary mt-3">
              Read Post
            </Link>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default Home;
