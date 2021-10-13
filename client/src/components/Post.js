import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Container } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';

import parseContent from '../utils/parseContent';

const Post = (props) => {
  const { id } = props.match.params;

  const GET_POST = gql`
    query {
      Post(where: {
        id: "${id}"
      }) {
        title
        author {
          name
        }
        categories {
          name
        }
        unsplashCoverImage {
          publicUrl
          user {
            name
            url
          }
        }
        createdAt
        body {
          document
          unsplashImages {
            id
            image {
              publicUrl
              user {
                name
                url
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POST);

  if (loading) return <p>Loading....</p>;
  if (error) return <h1>Error</h1>;

  const { title, body, author, categories, unsplashCoverImage, createdAt } =
    data.Post;

  const content = JSON.parse(body.document);
  const unsplashImages = body.unsplashImages;

  return (
    <Container>
      <header>
        {unsplashCoverImage ? (
          <figure className="figure">
            <img
              src={unsplashCoverImage.publicUrl}
              alt=""
              className="figure-img img-fluid"
            />
            <figcaption className="figure-caption">
              Photo by:{' '}
              <a href={unsplashCoverImage.user.url} target="_blank">
                {unsplashCoverImage.user.name}
              </a>{' '}
              on{' '}
              <a href="https://unsplash.com" target="_blank">
                Unsplash
              </a>
            </figcaption>
          </figure>
        ) : null}
        <h1>{title}</h1>
        <h3>{author.name}</h3>
        <p>{moment(createdAt).format('MMMM Do, YYYY')}</p>
        <div>
          {categories.map(({ name }) => (
            <Link to={`/categories/${name}`}>
              <Badge className="mr-1">{name}</Badge>
            </Link>
          ))}
        </div>
      </header>

      <section className="content mt-4 mb-3">
        {parseContent(content, unsplashImages)}
      </section>
    </Container>
  );
};

export default Post;
