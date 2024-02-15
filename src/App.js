import React, { useState } from 'react';
import './App.css';

function App() {
  const [language, setLanguage] = useState('th'); // State เก็บภาษาปัจจุบัน ('th' หมายถึง ไทย)
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cvResult, setCvResult] = useState('');
  const [showBestCVResult, setShowBestCVResult] = useState(false);

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (!productName || !price || !quantity) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    const newProduct = {
      name: productName,
      price: parseFloat(price),
      quantity: parseFloat(quantity)
    };
    setProducts([...products, newProduct]);
    setProductName('');
    setPrice('');
    setQuantity('');
    setShowBestCVResult(false); // Reset best CV result display
    // Add fade-in animation class to product list
    setTimeout(() => setShowBestCVResult(true), 300); // Delay showing best CV result to match animation duration
  };

  const calculateCV = () => {
    if (products.length < 2) {
      alert("Please add at least 2 products to compare.");
      return;
    }
    const prices = products.map(product => product.price);
    const meanPrice = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    const variance = prices.map(price => Math.pow(price - meanPrice, 2)).reduce((acc, val) => acc + val, 0);
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = (standardDeviation / meanPrice) * 100;
    const lowestCVProduct = products.reduce((acc, val) => (val.price / val.quantity) < (acc.price / acc.quantity) ? val : acc);
    setCvResult(`Coefficient of Variation (CV%): ${coefficientOfVariation.toFixed(2)}%\nBest product in terms of CV: ${lowestCVProduct.name}`);
    setShowBestCVResult(true); // Show best CV result
  };

  const handleClearProducts = () => {
    setProducts([]);
    setCvResult('');
    setShowBestCVResult(false);
  };

  // เพิ่มฟังก์ชันเปลี่ยนภาษา
  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th'); // สลับภาษาระหว่าง 'th' กับ 'en'
  };

  return (
    <div className="container">
      <h1 className="mt-5">{language === 'th' ? 'เปรียบเทียบสินค้า' : 'Product Comparison'}<button className="btn btn-info mt-3 ms-2" onClick={toggleLanguage}>{language === 'th' ? 'เปลี่ยนภาษาเป็นอังกฤษ' : 'Switch to Thai'}</button></h1>
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label className="form-label" htmlFor="productName">{language === 'th' ? 'ชื่อสินค้า' : 'Product Name'}</label>
          <input type="text" className="form-control" id="productName" placeholder={language === 'th' ? 'กรอกชื่อสินค้า' : 'Enter product name'} value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">{language === 'th' ? 'ราคา' : 'Price'}</label>
          <input type="number" min="0" step="0.01" className="form-control" id="price" placeholder={language === 'th' ? 'กรอกราคา' : 'Enter price'} value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="quantity">{language === 'th' ? 'จำนวน' : 'Quantity'}</label>
          <input type="number" min="0" step="1" className="form-control" id="quantity" placeholder={language === 'th' ? 'กรอกจำนวน' : 'Enter quantity'} value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{language === 'th' ? 'เพิ่มสินค้า' : 'Add Product'}</button>
      </form>
      <hr />
      <div className="product-list">
        {products.map((product, index) => (
          <div className={`product-card fade-in ${showBestCVResult && product.name === cvResult.split(': ')[1] ? 'best-cv-result' : ''}`} key={index}>
            <h3>{product.name}</h3>
            <p>{language === 'th' ? 'ราคา' : 'Price'}: ${product.price.toFixed(2)}, {language === 'th' ? 'จำนวน' : 'Quantity'}: {product.quantity}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-success mt-3" onClick={calculateCV}>{language === 'th' ? 'คำนวณ CV' : 'Calculate CV'}</button>
      <button className="btn btn-danger mt-3 ms-2" onClick={handleClearProducts}>{language === 'th' ? 'ล้างสินค้า' : 'Clear Products'}</button>
      {cvResult && <div id="result" className="mt-3">
        <p className="fw-bold">{cvResult}</p>
      </div>}
    </div>
  );
}

export default App;
