import { useNavigate } from "react-router-dom";

function Product({shoes}) {
  const image = `/images/shoes${shoes.id + 1}.jpg`;
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "80%",          // 부모 영역 크기
          aspectRatio: "1 / 1",  // 정사각형 비율 유지
          overflow: "hidden",    // 넘치는 부분 잘라내기
          margin: "0 auto",      // 가운데 정렬
          display: "flex",       // flexbox 사용
          alignItems: "center",  // 세로 가운데 정렬
          justifyContent: "center" // 가로 가운데 정렬 (옵션)
        }}
        onClick={() => navigate(`/detail/${shoes.id}`)}
      >
        <img
          src={image}
          alt={shoes.title}
          style={{
            width: "100%",       // 가로에 맞추기
            height: "auto"       // 비율 유지
          }}
        />
      </div>
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
    </>
  );
}
export default Product;
