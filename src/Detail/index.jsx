import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Discount from "../Discount";
import Nav from "react-bootstrap/Nav";
import TabContent from "../TabContent";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import cartStore from "../store/cartStore";
import { formatKRW } from "../util/formatKRW";

function Detail({ product }) {
  const { loginUser } = useContext(UserContext);

  let [detailFade, setDetailFade] = useState("");

  const [showAlert, setShowAlert] = useState(true);
  const [inputData, setInputData] = useState("");

  // 숫자말고 문자 입력 시 처리를 확인할 논리값
  const [state, setState] = useState(true);

  // /detail/:id 에서 받은 id pathvariable 값을 확인
  // hook : useParams
  let { id } = useParams();
  const navigate = useNavigate();

  // 페이지 상태: sessionStorage 기반
  const [tabState, setTabState] = useState(() => 0); // 초기값 0

  // cartStore에서 addItem 가져오기
  const { addItem, cartData } = cartStore();

  // 주문하기 버튼 클릭
  const handleOrder = () => {
    const orderItem = {
      id: findProduct.id,
      name: findProduct.title,
      count: 1,
      price: findProduct.price,
    };

    const existingItem = cartStore
      .getState()
      .cartData.find((x) => x.id === orderItem.id);

    if (existingItem) {
      const confirmAdd = window.confirm(
        "이미 장바구니에 있는 상품입니다. 수량을 1개 추가하시겠습니까?"
      );
      if (!confirmAdd) return; // 사용자가 아니오 클릭하면 종료
    }

    addItem(orderItem); // 장바구니에 추가/수량 증가

    // 추가 후 이동 선택
    const goToCart = window.confirm(
      "장바구니에 상품이 추가되었습니다. 장바구니로 이동하시겠습니까?"
    );
    if (goToCart) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    // 같은 페이지 내 새로고침 시 sessionStorage에 값이 있으면 반영
    const saved = sessionStorage.getItem(`tabState_${id}`);
    if (saved) setTabState(Number(saved));

    return () => {
      // Detail 컴포넌트 언마운트 시 sessionStorage 제거 → 다른 페이지 갔다오면 초기화
      sessionStorage.removeItem(`tabState_${id}`);
    };
  }, [id]);

  // 탭 변경 시
  const handleTabChange = (tabIndex) => {
    setTabState(tabIndex);
    sessionStorage.setItem(`tabState_${id}`, tabIndex);
  };

  // 애니메이션 용 Effect
  useEffect(() => {
    let timer = setTimeout(() => {
      setDetailFade("ani_end");
    }, 100);
    return () => {
      clearTimeout(timer);
      setDetailFade("");
    };
  }, []);

  // useEffect 실행 확인
  useEffect(() => {
    // 타이머를 붙이고 2초 후에 Discount가 사라지도록
    const myTimer = setTimeout(() => setShowAlert(false), 2000);
    // 기존 사용 타이머 삭제
    return () => {
      clearTimeout(myTimer);
    };
    // 처음 실행될 때 딱 1번만 실행된다는 의미
  }, []);

  // 입력 수량 확인용 Effect
  // input 상자에만 반응
  useEffect(() => {
    // inputData state가 문자라면
    if (isNaN(inputData)) {
      setState(true);
    } else {
      setState(false);
    }
  }, [inputData]);

  // 가져온 pathvariable 값을 숫자로 변환
  // props 로 전달받은 product 배열에서 해당하는 객체만 찾음
  let findProduct = product.find((item) => item.id === Number(id));
  if (!findProduct) {
    // localStorage에서 product 복원
    const savedProduct = localStorage.getItem("product");
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct);
      findProduct = parsedProduct.find((item) => item.id === Number(id));
    }
  }

  if (!findProduct) {
    alert("찾는 상품이 없습니다.");
    navigate(-1);
    return null;
  }

  // 장바구니에 이 상품이 이미 있는지 확인
  const isInCart = cartData.some((item) => item.id === findProduct.id);

  return (
    <div className={`container ani_start ${detailFade}`}>
      <div className="container mt-2">{showAlert && <Discount />}</div>
      <div className="row">
        <div
          className="col-md-6"
          style={{
            maxHeight: "416px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={`/images/shoes${findProduct.id + 1}.jpg`} height="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          {/* 문자가 들어올 때 출력할 내용 */}
          {state && <div>오류</div>}
          {/* <p>
            수량 : 
            <input 
            type="text" 
            style={{marginLeft: "10px"}}
            onChange={(e) => {setInputData(e.target.value);}} />
          </p> */}
          <p>
            {formatKRW(findProduct.price)}
            <span style={{ marginLeft: "4px" }}></span>
          </p>
          <p>{loginUser && <span>{loginUser.email}</span>}</p>
          <button className="btn btn-danger" onClick={handleOrder}>
            {isInCart ? "수량추가" : "주문하기"}
          </button>
          {isInCart && (
            <button
              className="btn btn-primary"
              style={{ marginLeft: "4px" }}
              onClick={() => navigate("/cart")}
            >
              카트 보기
            </button>
          )}
        </div>
      </div>
      <Nav variant="tabs" activeKey={`link-${tabState}`}>
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              handleTabChange(0);
            }}
          >
            특징
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              handleTabChange(1);
            }}
          >
            사이즈
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              handleTabChange(2);
            }}
          >
            배송
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => {
              handleTabChange(3);
            }}
          >
            리뷰
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 선택한 탭의 내용이 표시되는 공간 */}
      <TabContent
        className="tab-content-area"
        tabState={tabState}
        product={findProduct}
      />
    </div>
  );
}
export default Detail;
