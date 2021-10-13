import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

const PostCard = (props) => {
  const { post } = props;

  return (
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
  );
};

export default PostCard;
