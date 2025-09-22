import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./AppNavBar.css";
// Route : 페이지(컴포넌트) 이동 처리
// Routes : Route를 감싸는 용도
// useParams : url에 담겨있는 정보를 획득
// Link : 실제로 페이지를 보여주는 역할, Link위치에 컴포넌트 뿌려줌
// useNavigate : 스크립트 영역에서 링크처리를 하는 훅
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import userStore from "../store/userStore";

function AppNavBar() {
  // Contex에 저장되어 있는 정보를 변수에 담는 작업
  const { loginUser } = useContext(UserContext);

  // 스토어에서 정보 가져오기 (zustand 사용)
  const { userName, productStock, productName, changeName, addProduct } =
    userStore();
  
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Muzinjang</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              {/* <Nav.Link onClick={()=>{navigate('/detail');}}>Detail</Nav.Link> */}
              <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
              <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
              <NavDropdown title="Info" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/about/member")}>
                  Member
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/about/location")}>
                  Location
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <Nav.Link as="span">
                {/* {loginUser?.name ? `${loginUser.name}님 로그인` : "로그인 해주세요"} */}
                {`${userName}님 로그인`}
              </Nav.Link>
              {/* 버튼 클릭 시 이름 변경 */}
              <Nav.Link
                as="button"
                onClick={() => {
                  changeName();
                  addProduct("르무통", 5);
                }}
              >
                유저변경
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default AppNavBar;
