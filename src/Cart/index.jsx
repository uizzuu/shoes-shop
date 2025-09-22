import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import userStore from "../store/userStore";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { formatKRW } from "../util/formatKRW";

function Cart() {
  const userName = userStore((state) => state.userName);
  // const cartData = cartStore((x)=>x.cartData);
  const {
    cartData,
    addItem,
    removeItem,
    updateItem,
    plusCount,
    minusCount,
    removeAll,
  } = cartStore();

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

  // 데이터 업데이트 함수
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

  // plus, minus, delete
  const handlePlus = () => {
    plusCount();
  };
  const handleMinus = () => {
    minusCount();
  };

  // 총 금액 계산
  // useMemo : 메모이제이션, cartData가 변경될 때만 total이 계산되도록
  // item.price??0 : item.price가 null이면 0, 그렇지 않으면 원래값 return
  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (sum, item) => sum + (item.price ?? 0) * (item.count ?? 0),
        0
      ),
    [cartData]
  );

  return (
    <>
      <Container>
        {/* CRUD 테스트용 Form */}
        {/* <Form className="mt-3 mb-4 px-2">
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
            <Col xs={12} md={4}>
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
            <Col xs={12} md={2}>
              <Form.Label>금액</Form.Label>
              <InputGroup>
                <Form.Control
                  name="price"
                  type="number"
                  placeholder="예 : 1"
                  min={1}
                  value={form.price}
                  onChange={onChange}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={2} className="d-flex gap-2 mt-auto">
              <Button
                variant="primary"
                className="flex-fill"
                onClick={handleAdd}
              >
                추가
              </Button>
              <Button
                variant="primary"
                className="flex-fill"
                onClick={handleUpdate}
              >
                수정
              </Button>
              <Button
                variant="primary"
                className="flex-fill"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </Col>
          </Row>
        </Form> */}

        <Table className="mt-3 mb-4">
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th>변경하기</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((cart, i) => (
              <tr key={i}>
                <td>{cart.id + 1}</td>
                <td>{cart.name}</td>
                <td>{cart.count}</td>
                <td>{formatKRW(cart.price * cart.count)}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button
                      className="btn btn-sm btn-success"
                      onClick={() => plusCount(cart.id)}
                    >
                      +
                    </Button>
                    <Button
                      className="btn btn-sm btn-warning"
                      onClick={() => minusCount(cart.id)}
                    >
                      -
                    </Button>
                    <Button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(cart.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* 총 금액 표시 */}
            <tr>
              <td
                className="text-end"
                colSpan={5}
                style={{ fontSize: "1.55rem" }}
              >
                총 금액
                <span className="fw-bold" style={{ marginLeft: "8px" }}>
                  {formatKRW(totalPrice)}
                </span>
              </td>
            </tr>
          </tfoot>
        </Table>
        {/* 카트 전체 삭제 버튼 */}
        <div className="d-flex justify-content-end mb-2">
          <Button
            variant={cartData.length > 0 ? "danger" : "secondary"}
            onClick={removeAll}
            disabled={cartData.length === 0} // 데이터 없으면 비활성화
          >
            카트 전체 삭제
          </Button>
        </div>
      </Container>
    </>
  );
}

// Cart 부모컴포넌트 내부의 state가 변하더라도 관련이 없는 state라면 다시 랜더링하지 않음
// Cart와 관계가 있는 state가 변화할 때만 랜더링된다는 의미
export default React.memo(Cart);
