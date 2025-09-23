import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./AppNavBar.css";
// Route : 페이지(컴포넌트) 이동 처리
// Routes : Route를 감싸는 용도
// useParams : url에 담겨있는 정보를 획득
// Link : 실제로 페이지를 보여주는 역할, Link위치에 컴포넌트 뿌려줌
// useNavigate : 스크립트 영역에서 링크처리를 하는 훅
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { useContext } from "react";
import userStore from "../store/userStore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";

function AppNavBar() {
  // Contex에 저장되어 있는 정보를 변수에 담는 작업
  // const { loginUser } = useContext(UserContext);

  // 스토어에서 정보 가져오기 (zustand 사용)
  const { userName, changeName, addProduct } = userStore();

  // 로그인 정보를 담을 스테이트 선언
  const [userInfo, setUserInfo] = useState(undefined);

  const navigate = useNavigate();

  // 파이어베이스 구글 로그인 설정
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserInfo(undefined);
      navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

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
              {userInfo && (
                <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
              )}
              <Nav.Link onClick={() => navigate("/recent")}>Recent</Nav.Link>
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
              {userInfo ? (
                <div className="d-flex align-items-center">
                  <div className="userInfoWrap">
                    <div>
                      <img
                        src={userInfo.photoURL}
                        alt={userInfo.displayName}
                        className="userImage"
                      />
                    </div>
                    <span className="me-3 text-light small">
                      {userInfo.displayName
                        ? `${userInfo.displayName} 님`
                        : userInfo.email}
                    </span>
                  </div>
                  <Nav.Link onClick={handleLogOut}>LogOut</Nav.Link>
                </div>
              ) : (
                <Nav.Link onClick={handleAuth}>LogIn</Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default AppNavBar;
