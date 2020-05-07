import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail } from '../components';

function ProductDetail({
  product: initProduct,
  handleCancelProduct,
  handleSaveProduct,
  history,
}) {
  const [product, setProduct] = useState(Object.assign({}, initProduct));

  useEffect(() => {
    if (!product) {
      history.push('/products'); // no product, bail out of Details
    }
  }, [product, history]);

  function handleSave() {
    const chgProduct = { ...product, id: product.id || null };
    handleSaveProduct(chgProduct);
  }

  function handleNameChange(e) {
    setProduct({ ...product, name: e.target.value });
  }

  function handleDescriptionChange(e) {
    setProduct({ ...product, description: e.target.value });
  }

  function handleQuantityChange(e) {
    setProduct({ ...product, quantity: e.target.value });
  }

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {product.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {product.id && (
            <InputDetail name="id" value={product.id} readOnly="true" />
          )}
          <InputDetail
            name="name"
            value={product.name}
            placeholder="Oranges"
            onChange={handleNameChange}
          />
          <InputDetail
            name="description"
            value={product.description}
            placeholder="box"
            onChange={handleDescriptionChange}
          />
          <div className="field">
            <label className="label" htmlFor="quantity">
              quantity
            </label>
            <input
              name="quantity"
              className="input"
              type="number"
              min="1"
              max="100"
              defaultValue={product.quantity}
              placeholder="1"
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="cancel-button"
          iconClasses="fas fa-undo"
          onClick={handleCancelProduct}
          label="Cancel"
        />
        <ButtonFooter
          className="save-button"
          iconClasses="fas fa-save"
          onClick={handleSave}
          label="Save"
        />
      </footer>
    </div>
  );
}

export default withRouter(ProductDetail);
