import React from 'react';

const parseContent = (content, unsplashImages) => {
  return content.nodes.map(({ type, data, nodes }) => {
    if (type === 'heading') {
      return <h3>{nodes[0].text}</h3>;
    }

    if (type === 'paragraph') {
      return (
        <p>
          {nodes.map(({ text, marks }) => {
            if (marks.length > 0) {
              if (marks[0].type === 'bold') {
                return <strong>{text}</strong>;
              }

              if (marks[0].type === 'italic') {
                return <em>{text}</em>;
              }

              if (marks[0].type === 'underline') {
                return <u>{text}</u>;
              }

              if (marks[0].type === 'strikethrough') {
                return <strike>{text}</strike>;
              }
            } else return text;
          })}
        </p>
      );
    }

    if (type === 'unordered-list') {
      return (
        <ul>
          {nodes.map((n) => (
            <li>{n.nodes[0].text}</li>
          ))}
        </ul>
      );
    }

    if (type === 'ordered-list') {
      return (
        <ol>
          {nodes.map((n) => (
            <li>{n.nodes[0].text}</li>
          ))}
        </ol>
      );
    }

    if (type === 'unsplashImage') {
      const image = unsplashImages.find((img) => img.id === data._joinIds[0]);

      return (
        <figure className="figure" key={image.id}>
          <img
            src={image.image.publicUrl}
            alt=""
            className="figure-img img-fluid"
          />
          <figcaption className="figure-caption">
            Photo by{' '}
            <a href={image.image.user.url} target="_blank">
              {image.image.user.name}
            </a>{' '}
            on <a href="https://unsplash.com">Unsplash</a>
          </figcaption>
        </figure>
      );
    }

    if (type === 'blockquote') {
      return (
        <blockquote className="blockquote">
          {nodes.map((n) =>
            n.nodes.map((m) => <p className="mb-0">{m.text}</p>)
          )}
        </blockquote>
      );
    }
  });
};

export default parseContent;
