import React from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import userStore from "../store/userStore";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

function Cart() {
  const userName = userStore((state) => state.userName);

  // const cartData = cartStore((x)=>x.cartData);
  const { cartData } = cartStore();

  return (
    <>
    {/* CRUD 테스트용 Form */}
    <Form className="mb-3 px-3">
      <Row className="gy-2 gx-2 align-items-center">  
        <Col xs={12} md={2}>
        <Form.Label>ID</Form.Label>
        <Form.Control name="id" type="number" placeholder="예 : 2" min={0} />
        </Col>      
        <Col xs={12} md={6}>
        <Form.Label>상품명</Form.Label>
        <Form.Control name="name" type="text" placeholder="예 : Red Nike Air" />
        </Col>      
        <Col xs={12} md={2}>
        <Form.Label>수량</Form.Label>
        <InputGroup>
        <Form.Control name="count" type="number" placeholder="예 : 1" min={1} />
        </InputGroup>
        </Col>   
        <Col xs={12} md={2} className="d-flex gap-2">
        <Button variant="primary" className="flex-fill">추가</Button>
        </Col>   
        <Col xs={12} md={2} className="d-flex gap-2">
        <Button variant="primary" className="flex-fill">수정</Button>
        </Col>   
        <Col xs={12} md={2} className="d-flex gap-2">
        <Button variant="primary" className="flex-fill">삭제</Button>
        </Col>   
      </Row>
    </Form>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경하기</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((cart, i) => (
              <tr key={i}>
                <td>{cart.id + 1}</td>
                <td>{cart.name}</td>
                <td>{cart.count}</td>
                <td>수정삭제</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

// Cart 부모컴포넌트 내부의 state가 변하더라도 관련이 없는 state라면 다시 랜더링하지 않음
// Cart와 관계가 있는 state가 변화할 때만 랜더링된다는 의미
export default React.memo(Cart);
