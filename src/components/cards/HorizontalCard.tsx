import React from 'react';
import { Link } from 'react-router-dom';

type HorizontalCardType = {
  linkUrl: string;
  linkText: string;
  title?: string;
  content?: string | number | JSX.Element;
  [key: string]: unknown;
};

const HorizontalCard = ({ linkUrl, linkText, title = '', content = '' }: HorizontalCardType) => {
  return (
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title grey-text text-darken-3">{title}</span>
          <div>{content}</div>
        </div>
        <div className="card-action">
          <Link to={linkUrl}>{linkText}</Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
