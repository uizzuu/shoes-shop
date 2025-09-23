import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recent({ product }) {
  const [recentList, setRecentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 가져오기, 최신 순으로 정렬하기
    const getRecentData = localStorage.getItem("recent");
    // recent가 비어있으면 그냥 리턴
    if (!getRecentData) return;
    // 스토리지 데이터 -> 배열로 변환
    const parsed = JSON.parse(getRecentData);
    // 중복 제거 + 최신순 정렬
    const uniqueList = [...new Set(parsed)];
    setRecentList(uniqueList);
  }, []);

  let handleRemove = () => {
    localStorage.removeItem("recent");
    setRecentList([]);
  };

  // localStorage가 비어있으면,
  // <div className="container py-4">최근 본 상품이 없습니다.</div>
  // 출력하기
  if (recentList.length === 0) {
    return <h4 className="container py-4">최근 본 상품이 없습니다.</h4>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">최근 본 상품</h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleRemove}
        >
          전체 지우기
        </button>
      </div>

      <div className="row g-3">
        {recentList.map((id) => {
          const findProduct = product.find((p) => p.id === id);
          if (!findProduct) return null;

          return (
            <div className="col-6 col-md-4 col-lg-3" key={id}>
              <div
                className="card h-100"
                role="button"
                //상세페이지 보기로 이동
                onClick={() => navigate(`/detail/${id}`)}
              >
                <img
                  src={`/images/shoes${id + 1}.jpg`}
                  className="card-img-top"
                  // title로 alt표시하기
                  alt={findProduct.title}
                  style={{ maxHeight: "230px", objectFit: "contain",  }}
                />
                <div className="card-body">
                  <div className="fw-semibold">{findProduct.title}</div>
                  <div className="text-muted small">{findProduct.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
