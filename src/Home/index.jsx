import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../Product";
import axios from "axios";

function Home({ product, setProduct }) {
  return (
    <>
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
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="primary"
          size="md"
          onClick={async () => {
            try {
              const result = await axios(
                "https://zzzmini.github.io/js/react_data_01.json"
              );
              let temp = [...product, ...result.data];
              setProduct(temp);
            } catch (error) {
              console.log("axios 가져오기 실패");
            }

            // 데이터를 3개 가져오는 함수
            // axios
            //   .get("https://zzzmini.github.io/js/react_data_01.json")
            //   .then((result) => {
            //     let temp = [...product];
            //     for (let x of result.data) {
            //       temp.push(x);
            //     }
            //     setProduct(temp);
            //   })
            //   .catch(() => {
            //     console.log("가져오기 실패");
            //   });
          }}
        >
          데이터 가져오기
        </Button>
      </div>
    </>
  );
}

export default Home;
