import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import useDiscounts from './useDiscounts';

function Discounts() {
  let errorMessage = undefined;

  const { getDiscounts, discounts } = useDiscounts();

  useEffect(() => {
    getDiscounts();
  }, [getDiscounts]);

  // async function getDiscounts() {
  //   errorMessage = undefined;
  //   try {
  //     await getDiscountsAction();
  //   } catch (error) {
  //     errorMessage = 'Unauthorized';
  //   }
  // }

  return (
    <div className="content-container">
      <div className="content-title-group not-found">
        <h2 className="title">My Shopping List</h2>
        <div>
          {errorMessage && <div>{errorMessage}</div>}
          {!discounts.length && !errorMessage && <div>Loading data ...</div>}
          <ul className="list">
            {discounts.map((discount, index) => (
              <li key={discount.id} role="presentation">
                <div className="card">
                  <div className="card-content">
                    <div className="content discount-grid">
                      <label>Store:</label>
                      <span>{discount.store}</span>
                      <label>Discount:</label>
                      <span>{discount.percentage}</span>
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
    </div>
  );
}

export default withRouter(Discounts);
