import React from "react";

import { styles } from "./_Article.css";

interface ArticleProps {
  data: {
    title: string;
    image: string;
    url: string;
    description: string | null;
  };
}

export const Article: React.FC<ArticleProps> = ({ data }) => {
  return (
    <>
      <style>{styles}</style>
      <article className="shareit-article">
        <div
          className="image"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="title">{data.title}</div>
        </div>
        <div className="description">{data.description}</div>
      </article>
    </>
  );
};
