import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import useDiscounts from './useDiscounts';
import { ListHeader } from './components';

function Discounts() {
  const { getDiscounts, discounts, error: errorMessage } = useDiscounts();

  useEffect(() => {
    const fetchData = async () => {
      await getDiscounts();
    };
    fetchData();
  }, [getDiscounts]);

  return (
    <div className="content-container">
      <ListHeader
        title="My Discounts"
        handleRefresh={getDiscounts}
        routePath="/discounts"
        hideAdd
      />
      <div>
        {errorMessage && <div>{errorMessage}</div>}
        {(!discounts || !discounts.length) && !errorMessage && (
          <div>Loading data ...</div>
        )}
        <ul className="list">
          {discounts &&
            discounts.map((discount, index) => (
              <li key={discount.id} role="presentation">
                <div className="card">
                  <div className="card-content">
                    <div className="content discount-grid">
                      <label>Store:</label>
                      <span>{discount.store}</span>
                      <label>Discount:</label>
                      <span>{discount.percentage}%</span>
                      <label>Code:</label>
                      <span>{discount.code}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Discounts);
