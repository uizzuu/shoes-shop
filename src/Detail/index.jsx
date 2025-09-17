import { useNavigate, useParams } from "react-router-dom";

function Detail({product}){
  // /detail/3 에서 받은 id pathvariable 값을 확인
  // hook : useParams
  let {id} = useParams();
  const navigate = useNavigate();
  
  // 가져온 pathvariable 값을 숫자로 변환
  // props 로 전달받은 product 배열에서 해당하는 객체만 찾음
  const findProduct = product.find(item => {
    return item.id === Number(id);
  });

  // 해당하는 제품이 존재하지 않을 때 처리
  if(findProduct == null){
    alert('찾는 상품이 없습니다.');
    // 이전페이지로 이동
    // history.back() : 자바스크립트 용
    navigate(-1);
    return null;
  }
  

  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={`/images/shoes${findProduct.id+1}.jpg`} 
            width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;