import React from 'react';

const Search: React.FC = () => {
  return (
    <>
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="search_svg__feather search_svg__feather-search"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    </>
  );
};

export default React.memo(Search);
