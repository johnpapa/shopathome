import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function ProductList({
  handleDeleteProduct,
  handleSelectProduct,
  products,
  history,
}) {
  function selectProduct(e) {
    const product = getSelectedProduct(e);
    handleSelectProduct(product);
    history.push(`/products/${product.id}`);
  }

  function deleteProduct(e) {
    const product = getSelectedProduct(e);
    handleDeleteProduct(product);
  }

  function getSelectedProduct(e) {
    const index = +e.currentTarget.dataset.index;
    return products[index];
  }

  return (
    <div>
      {products.length === 0 && <div>Loading data ...</div>}
      <ul className="list">
        {products.map((product, index) => (
          <li key={product.id} role="presentation">
            <div className="card">
              <CardContent
                name={product.name}
                description={product.description}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteProduct}
                  label="Delete"
                  dataIndex={index}
                  dataId={product.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectProduct}
                  label="Edit"
                  dataIndex={index}
                  dataId={product.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ProductList);
