import React from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userStore from "../store/userStore";
import cartStore from "../store/cartStore";

function Cart() {
  const cartData = cartStore((x)=>x.cartData);

  return (
    <>
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
            {cartData.map((cart, i)=>(
              <tr key={i}>
              <td>{cart.id+1}</td>
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
