import React, { useEffect } from 'react';
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
            discounts.map((discount /*, index */) => (
              <li key={discount.id} role="presentation">
                <div className="card">
                  <div className="card-content">
                    <div className="content discount-grid">
                      <label htmlFor="store">Store:</label>
                      <span id="store">{discount.store}</span>
                      <label htmlFor="discount">Discount:</label>
                      <span id="discount">{discount.percentage}%</span>
                      <label htmlFor="code">Code:</label>
                      <span id="code">{discount.code}</span>
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

export default Discounts;
