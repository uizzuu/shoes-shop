import "./App.css";
import AppNavBar from "./AppNavBar";
import Product from "./Product";
import { Container, Row, Col } from "react-bootstrap";
// src/assets 폴더 내의 이미지는 import해서 사용
import bg_png from "./assets/images/bg.png";
import data from "./data/data";
import { useState } from "react";

function App() {
  // 상품정보를 갖는 product 스테이트를 만든다
  const [product, setProduct] = useState(data);
  console.log(product);
  return (
    <>
      <div className="App">
        {/* 네비게이션바 */}
        <AppNavBar />

        {/* 메인 대문사진 */}
        <div
          className="main-bg"
          style={{ backgroundImage: `url('${bg_png}')` }}
        ></div>

        {/* 상품 진열 */}
        <Container>
          <Row>
            {
              product.map((s, i) => {
                return(
                  <Product product={s} key={i} />
                );
              })
            }
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
