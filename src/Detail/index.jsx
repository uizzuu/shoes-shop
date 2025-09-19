import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Discount from "../Discount";
import Nav from "react-bootstrap/Nav";
import TabContent from "../TabContent";

function Detail({ product }) {
  let [detailFade, setDetailFade] = useState('');

  const [showAlert, setShowAlert] = useState(true);
  const [inputData, setInputData] = useState("");
  // 숫자말고 문자 입력 시 처리를 확인할 논리값
  const [state, setState] = useState(true);

  // 탭을 눌렀을 때 선택되는 페이지값을 갖는 스테이트
  const [tabState, setTabState] = useState(0);

  // 애니메이션 용 Effect
  useEffect(() => {
    let timer = setTimeout(() => {
        setDetailFade('ani_end');
    }, 100);
    return(() => {
        clearTimeout(timer);
        setDetailFade('');
    });
  }, []
);

  // useEffect 실행 확인
  useEffect(() => {
    // 타이머를 붙이고 2초 후에 Discount가 사라지도록
    const myTimer = setTimeout(() => setShowAlert(false), 2000);
    // 기존 사용 타이머 삭제
    return () => {
      clearTimeout(myTimer);
    };
    // 처음 실행될 때 딱 1번만 실행된다는 의미
  }),
    [];

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

  // /detail/3 에서 받은 id pathvariable 값을 확인
  // hook : useParams
  let { id } = useParams();
  const navigate = useNavigate();

  // 가져온 pathvariable 값을 숫자로 변환
  // props 로 전달받은 product 배열에서 해당하는 객체만 찾음
  const findProduct = product.find((item) => {
    return item.id === Number(id);
  });

  // 해당하는 제품이 존재하지 않을 때 처리
  if (findProduct == null) {
    alert("찾는 상품이 없습니다.");
    // 이전페이지로 이동
    // history.back() : 자바스크립트 용
    navigate(-1);
    return null;
  }

  return (
    <div className={`container ani_start ${detailFade}`}>
      <div className="container mt-2">{showAlert && <Discount />}</div>
      <div className="row">
        <div className="col-md-6">
          <img src={`/images/shoes${findProduct.id + 1}.jpg`} width="100%" />
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
            {findProduct.price}
            <span style={{ marginLeft: "4px" }}>원</span>
          </p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" ActiveKey={`link-${tabState}`}>
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {setTabState(0);}}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {setTabState(1);}}>
            버튼2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {setTabState(2);}}>
            버튼3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 선택한 탭의 내용이 표시되는 공간 */}
      <TabContent tabState={tabState}/>
    </div>
  );
}
export default Detail;
