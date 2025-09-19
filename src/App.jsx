import "./App.css";
import AppNavBar from "./AppNavBar";
// assets 폴더 내의 이미지 사용법 -> import 해서 사용
// import img_2 from "./assets/images/shoes2.jpg";
import data from "./data/data";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import About from "./About";
import Home from "./Home";
import { UserContext } from "./context/UserContext";

function App() {
  // 상품정보를 갖는 product 스테이트를 만든다.
  const [product, setProduct] = useState(data);
  const [count, setCount] = useState(0);

  return (
    <>
      {/* 네비게이션 바 영역 시작 */}
      <AppNavBar />
      {/* 네비게이션 바 영역 끝 */}
      {/* Routing 정보를 한꺼번에 모아놓는 장소 */}
      {/* 스프링에서 사용하는 컨트롤러 클래스 */}
      <Routes>
        <Route path="/" element={<Home product={product} setProduct={setProduct} count={count} setCount={setCount}/>} />
        {/* PathVariable */}
        {/* /detail/1, /detail/2 이런식으로 적용 */}
        <Route path="/detail/:id" element={<Detail product={product}/>} />
        <Route path="/cart" element={<div>장바구니페이지</div>} />
        {/* 중첩 라우팅 처리 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>Member</div>} />
          <Route path="location" element={<div>Location</div>} />
        </Route>
        <Route path="*" element={<div>Page Not Found 404 Error</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
