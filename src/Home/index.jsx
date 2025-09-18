import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../Product";
import axios from "axios";
import { useState } from "react";
import bg_png from "../assets/images/bg.png";

function Home({ product, setProduct, count, setCount }) {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleClick = async () => {
    if (count >= 2) {
      alert("더 이상 상품이 없습니다.");
      return;
    }

    try {
      setLoading(true);
      const fileNum = String(count + 1).padStart(2, "0");
      const url = `https://zzzmini.github.io/js/react_data_${fileNum}.json`;
      const result = await axios.get(url);
      setProduct([...product, ...result.data]);
      setCount(count + 1);
    } catch (error) {
      console.log("axios 가져오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 메인 대문사진 영역 시작 */}
      <div
        className="main-bg"
        style={{ backgroundImage: `url('${bg_png}')` }}
      />
      {/* 메인 대문사진 영역 끝 */}
      <Container>
        <Row xs={3}>
          {product.map((shoes, _) => {
            return (
              <Col key={shoes.id} className="text-center">
                {/* Product 콤포넌트 자리 */}
                <Product shoes={shoes} />
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="text-center my-3">
        {loading && <div>Loading .... Please Wait !!</div>}
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginBottom: "100px" }}
      >
        <Button variant="primary" size="md" onClick={handleClick}>
          데이터 가져오기
        </Button>
      </div>
    </>
  );
}

export default Home;
