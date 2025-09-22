import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import userStore from "../store/userStore";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

function Cart() {
  const userName = userStore((state) => state.userName);
  // const cartData = cartStore((x)=>x.cartData);
  const { cartData, addItem, removeItem, updateItem } = cartStore();

  // 폼 정보를 저장하는 스테이트
  const [form, setForm] = useState({
    id: "",
    name: "",
    count: 1,
  });

  // 폼 내부의 input 상자의 값이 바뀔 때 스테이트에 저장
  const onChange = (e) => {
    // 수정 중인 상자의 name, value 속성을 가져옴
    const { name, value } = e.target;
    // 스테이트에서 이전 스테이트 값을 활용
    // prev : form state 이전 값을 의미
    // 이 밑의 화살표함수 결과 : setForm(updated)
    setForm((prev) => {
      // 이전 값을 변수로 저장
      const updated = { ...prev };

      if (name === "id" || name === "count") {
        // id와 count는 숫자 필드니까 숫자로 변경
        if (value === "") {
          updated[name] = "";
        } else {
          updated[name] = Number(value);
        }
      } else if (name === "name") {
        updated[name] = value;
      }
      return updated;
    });
  };

  // 데이터 추가 함수
  const handleAdd = () => {
    addItem(form);
    clearForm();
  };

  // 데이터 삭제 함수
  const handleDelete = () => {
    removeItem(form.id);
    clearForm();
  };

  // 
  const handleUpdate = () => {
    updateItem(form.id, form);
    clearForm();
  };

  const clearForm = () => {
    setForm({
      id: "",
      name: "",
      count: 1,
    });
  };

  return (
    <>
      {/* CRUD 테스트용 Form */}
      <Form className="mb-3 px-3">
        <Row className="gy-2 gx-2 align-items-center">
          <Col xs={12} md={2}>
            <Form.Label>ID</Form.Label>
            <Form.Control
              name="id"
              type="number"
              placeholder="예 : 2"
              min={0}
              value={form.id}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>상품명</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="예 : Red Nike Air"
              value={form.name}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>수량</Form.Label>
            <InputGroup>
              <Form.Control
                name="count"
                type="number"
                placeholder="예 : 1"
                min={1}
                value={form.count}
                onChange={onChange}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button variant="primary" className="flex-fill" onClick={handleAdd}>
              추가
            </Button>
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button variant="primary" className="flex-fill" onClick={handleUpdate}>
              수정
            </Button>
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button variant="primary" className="flex-fill" onClick={handleDelete}>
              삭제
            </Button>
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
