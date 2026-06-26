import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

// Sample mock data for fallback presentation if backend isn't available
const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: '$299.99', category: 'electronics', description: 'Noise-cancelling over-ear headphones.' },
  { id: 2, name: 'Ergonomic Office Chair', price: '$189.50', category: 'furniture', description: 'High-back mesh chair with lumbar support.' },
  { id: 3, name: 'Stainless Steel Water Bottle', price: '$24.95', category: 'accessories', description: 'Double-wall vacuum insulated flask.' },
  { id: 4, name: 'Mechanical Gaming Keyboard', price: '$129.99', category: 'electronics', description: 'Tactile switches with customizable RGB.' }
];

export function ProductList() {
  const [category, setCategory] = useState('');
  const { data, isLoading, error, refetch } = useProducts(category);

  // Fallback to mock data if there is an error (e.g. backend connection refused)
  const productsToDisplay = error ? MOCK_PRODUCTS.filter(p => !category || p.category === category) : data;

  const categories = ['all', 'electronics', 'furniture', 'accessories'];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>Product Catalog</h2>
        <p style={subtitleStyle}>Demonstrates data fetching from REST API with dynamic filter state</p>
      </header>

      {/* Category Tabs */}
      <div style={tabContainerStyle}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === 'all' ? '' : cat)}
            style={{
              ...tabStyle,
              ...(category === cat || (cat === 'all' && category === '') ? activeTabStyle : {})
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={loadingStyle}>Loading products from API...</div>
      ) : (
        <div>
          {error && (
            <div style={alertStyle}>
              <strong>Note:</strong> API connection failed ({error.message}). Displaying mock fallback data for preview.
              <button onClick={refetch} style={retryButtonStyle}>Retry Connect</button>
            </div>
          )}

          {productsToDisplay.length === 0 ? (
            <div style={emptyStyle}>No products found.</div>
          ) : (
            <div style={gridStyle}>
              {productsToDisplay.map((product) => (
                <div key={product.id} style={cardStyle}>
                  <div style={categoryBadgeStyle}>{product.category}</div>
                  <h3 style={productTitleStyle}>{product.name}</h3>
                  <p style={descStyle}>{product.description}</p>
                  <div style={priceStyle}>{product.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Inline styles for high fidelity / premium representation
const containerStyle = {
  maxWidth: '900px',
  margin: '2rem auto',
  padding: '1.5rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  backgroundColor: '#121214',
  color: '#e1e1e6',
  borderRadius: '12px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
};

const headerStyle = {
  marginBottom: '2rem',
  borderBottom: '1px solid #29292e',
  paddingBottom: '1rem',
};

const titleStyle = {
  fontSize: '2rem',
  margin: 0,
  background: 'linear-gradient(90deg, #8257e6 0%, #04d361 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const subtitleStyle = {
  color: '#8d8d99',
  fontSize: '0.9rem',
  margin: '0.5rem 0 0 0',
};

const tabContainerStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginBottom: '1.5rem',
};

const tabStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  border: '1px solid #29292e',
  backgroundColor: '#202024',
  color: '#c4c4cc',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '0.85rem',
};

const activeTabStyle = {
  backgroundColor: '#8257e6',
  borderColor: '#8257e6',
  color: '#ffffff',
  boxShadow: '0 0 10px rgba(130, 87, 230, 0.4)',
};

const loadingStyle = {
  padding: '3rem',
  textAlign: 'center',
  color: '#8d8d99',
  border: '1px dashed #29292e',
  borderRadius: '8px',
};

const alertStyle = {
  padding: '1rem',
  backgroundColor: '#2b1a1a',
  border: '1px solid #c53030',
  borderRadius: '6px',
  color: '#f56565',
  fontSize: '0.875rem',
  marginBottom: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const retryButtonStyle = {
  marginLeft: '1rem',
  padding: '0.25rem 0.75rem',
  backgroundColor: '#c53030',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

const emptyStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#8d8d99',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1.5rem',
};

const cardStyle = {
  backgroundColor: '#202024',
  border: '1px solid #29292e',
  borderRadius: '8px',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  cursor: 'pointer',
};

const categoryBadgeStyle = {
  alignSelf: 'flex-start',
  padding: '0.2rem 0.5rem',
  backgroundColor: '#121214',
  color: '#8257e6',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: '1rem',
};

const productTitleStyle = {
  fontSize: '1.2rem',
  margin: '0 0 0.5rem 0',
  color: '#ffffff',
};

const descStyle = {
  fontSize: '0.875rem',
  color: '#c4c4cc',
  lineHeight: '1.4',
  margin: '0 0 1.5rem 0',
  flexGrow: 1,
};

const priceStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#04d361',
};

export default ProductList;
