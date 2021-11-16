import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { ListHeader, ModalYesNo } from '../components';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import useProducts from './useProducts';

const captains = console;

function Products() {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    addProduct,
    deleteProduct,
    getProducts,
    products,
    selectProduct,
    selectedProduct,
    updateProduct,
    error: errorMessage,
  } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function addNewProduct() {
    selectProduct({});
    navigate('/products/0', { state: {} });
  }

  function handleCancelProduct() {
    navigate('/products', { state: {} });
    selectProduct(null);
    setProductToDelete(null);
  }

  function handleDeleteProduct(product) {
    selectProduct(null);
    setProductToDelete(product);
    setShowModal(true);
  }

  function handleSaveProduct(product) {
    if (selectedProduct && selectedProduct.name) {
      captains.log(product);
      updateProduct(product);
    } else {
      addProduct(product);
    }
    handleCancelProduct();
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteFromModal() {
    setShowModal(false);
    deleteProduct(productToDelete);
    handleCancelProduct();
  }

  function handleSelectProduct(selectedProduct) {
    selectProduct(selectedProduct);
    captains.log(`you selected ${selectedProduct.name}`);
  }

  function handleRefresh() {
    handleCancelProduct();
    getProducts();
  }

  return (
    <div className="content-container">
      <ListHeader
        title="My List"
        handleAdd={addNewProduct}
        handleRefresh={handleRefresh}
        routePath="/products"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  errorMessage={errorMessage}
                  products={products}
                  selectedProduct={selectedProduct}
                  handleSelectProduct={handleSelectProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route
              path=":id"
              element={
                <ProductDetail
                  product={selectedProduct}
                  handleCancelProduct={handleCancelProduct}
                  handleSaveProduct={handleSaveProduct}
                />
              }
            />
          </Routes>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message={`Would you like to delete ${productToDelete.name}?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  );
}

export default Products;
