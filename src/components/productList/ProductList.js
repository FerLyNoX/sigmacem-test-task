import { useQuery } from '@tanstack/react-query';
import {
  Spinner, Alert, Row, Col, Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import fetchProducts from '../../api/products';

function ProductList({ search = '' }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search],
    queryFn: () => fetchProducts(search),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" />
      </div>
    );
  }
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  const products = data || [];

  if (products.length === 0) {
    return (
      <div className="no-products">
        Sorry, no products match your search criteria.
      </div>
    );
  }

  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // eslint-disable-next-line max-len
  const formatCategory = (category) => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <div className="content-container">
      {Object.keys(grouped).map((category) => (
        <div key={category} className="products-container">
          <div className="section-header-container">
            <h2 className="section-title">{formatCategory(category)}</h2>
          </div>
          <Row className="product-list-container">
            {grouped[category].map((product) => (
              <Col sm={1} md={4} xl={12} key={product.id} className="product-card-container">
                <Card className="product-image-container">
                  <Card.Img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="product-image"
                  />
                </Card>
                <div className="product-info-container">
                  <div className="product-name-container">
                    <Card.Title className="product-name" title={product.title}>
                      {product.title}
                    </Card.Title>
                  </div>
                  <div className="product-price-container">
                    <Card.Text className="product-price">
                      $
                      {product.price}
                    </Card.Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  search: PropTypes.string,
};

export default ProductList;
