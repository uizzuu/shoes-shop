import { useNavigate } from "react-router-dom";

function Product({ shoes }) {
  const image = `/images/shoes${shoes.id + 1}.jpg`;
  const navigate = useNavigate();

  let handleClick = () => {
    // 선택된 ID를 localStorag에 저장
    // 기존 localStorage에 최근 본 정보 recent가 존재하는지 확인
    let getRecentData = localStorage.getItem("recent");
    let saveData = [];

    if (!getRecentData) {
      // localStorage에 recent가 없는 경우 (getRecentData === null)
      // 배열을 만들어서 저장
      // unshift : 맨 앞에 추가, push : 맨 뒤에 추가
      // shift : 맨 앞에 삭제, pop : 맨 뒤에 삭제
      saveData.unshift(shoes.id);
      // saveData 배열을 json 타입으로 변환 후 스토리지에 저장
      localStorage.setItem("recent", JSON.stringify(saveData));
    } else {
      // localStorage에 recent가 존재하는 경우
      // json 타입을 array object로 변환
      saveData = JSON.parse(getRecentData);
      saveData.unshift(shoes.id);
      // 중복을 제거하기 위해서 set으로 변환 후 다시 저장
      saveData = [...new Set(saveData)];
      localStorage.setItem("recent", JSON.stringify(saveData));
    }

    navigate(`/detail/${shoes.id}`);
  };

  return (
    <>
      <div
        style={{
          width: "80%", // 부모 영역 크기
          aspectRatio: "1 / 1", // 정사각형 비율 유지
          overflow: "hidden", // 넘치는 부분 잘라내기
          margin: "0 auto", // 가운데 정렬
          display: "flex", // flexbox 사용
          alignItems: "center", // 세로 가운데 정렬
          justifyContent: "center", // 가로 가운데 정렬 (옵션)
        }}
        onClick={() => handleClick()}
      >
        <img
          src={image}
          alt={shoes.title}
          style={{
            // 가로에 맞추기
            height: "100%", // 비율 유지
            maxHeight: "217px",
          }}
        />
      </div>
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
    </>
  );
}
export default Product;
