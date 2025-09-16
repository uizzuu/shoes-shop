import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import './Product.css';

// 부모 컴포넌트에서 받은 props를 사용합니다.
function Product(props) {
  return (
    <>
      <Col className="text-center">
        <img
          src={`/images/shoes${props.product.id + 1}.jpg`}
          width="80%"
          alt={`shoes${props.product.id + 1}`}
        />
        <h4>{props.product.title}</h4>
        <p>{props.product.content}</p>
        <p>{props.product.price}</p>
      </Col>
    </>
  );
}

export default Product;