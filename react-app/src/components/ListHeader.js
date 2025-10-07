import React from 'react';
import { NavLink } from 'react-router-dom';

const ListHeader = ({
  title,
  handleAdd,
  handleRefresh,
  routePath,
  hideAdd,
}) => {
  return (
    <div className="content-title-group">
      <NavLink to={routePath}>
        <h2 className="title">{title}</h2>
      </NavLink>
      {!hideAdd && (
        <button
          className="button add-button"
          onClick={handleAdd}
          aria-label="add"
          data-testid="add-product-btn"
        >
          <i className="fas fa-plus" aria-hidden="true" />
        </button>
      )}
      <button
        className="button refresh-button"
        onClick={handleRefresh}
        aria-label="refresh"
        data-testid="refresh-btn"
      >
        <i className="fas fa-sync" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ListHeader;
