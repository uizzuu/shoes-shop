import React, { useState } from "react";
import reviews from "../data/shoesReview.json";
import ReviewModal from "./ReviewModal";

function Review({ productId }) {
  // 초기 리뷰 리스트: json + 상태 관리
  const initialReviews = reviews.filter((r) => r.productId === productId);
  const [reviewList, setReviewList] = useState(initialReviews);

  const [modalShow, setModalShow] = useState(false);

  // 0.5점 단위 별점 렌더링 (ReviewModal과 동일한 방식)
  const renderStars = (point) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starPercent = 0;
      if (point >= i) {
        starPercent = 100;
      } else if (point > i - 1) {
        // 남은 점수 비율을 0~100% 로 변환 (0.1 단위까지 반영)
        starPercent = (point - (i - 1)) * 100;
      }

      stars.push(
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: "1rem",
          }}
        >
          <span style={{ color: "#ccc" }}>★</span>
          <span
            style={{
              position: "absolute",
              overflow: "hidden",
              width: `${starPercent}%`,
              top: 0,
              left: 0,
            }}
          >
            ★
          </span>
        </span>
      );
    }
    return stars;
  };

  // 평균 별점 계산
  const averagePoint =
    reviewList.length > 0
      ? (
          reviewList.reduce((sum, r) => sum + r.point, 0) / reviewList.length
        ).toFixed(1)
      : 0;

  // 리뷰 등록
  const handleAddReview = (newReview) => {
    const reviewWithId = { ...newReview, reviewId: Date.now(), productId };
    setReviewList([reviewWithId, ...reviewList]);
  };

  return (
    <div className="review-list">
      {/* 리뷰 수와 평균 별점 표시 */}
      <div
        style={{ marginTop: "1.6rem", fontWeight: "bold", fontSize: "1.55rem" }}
      >
        Reviews({reviewList.length})<br />
      </div>
      <div
        style={{
          margin: "0.2rem 0 1rem",
          fontWeight: "normal",
          fontSize: "1.3rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{renderStars(Number(averagePoint))}</span>
        <span
          style={{
            marginLeft: "6px",
            fontSize: "1.2rem",
          }}
        >
          별 {averagePoint}개
        </span>
      </div>

      <div
        style={{
          textDecoration: "underLine",
          fontWeight: "bold",
          marginBottom: "1.6rem",
          fontSize: "1.15rem",
          cursor: "pointer",
        }}
        onClick={() => setModalShow(true)}
      >
        리뷰 등록하기
      </div>
      <hr style={{ color: "#777" }} />

      {reviewList.map((r) => (
        <div
          key={r.reviewId}
          className="review-item"
          style={{ marginBottom: "1rem" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.15rem" }}>
            {r.title}
          </div>
          <div
            style={{
              marginBottom: "0.2rem",
              fontSize: "0.9rem",
            }}
          >
            {renderStars(r.point)} {r.point}점
          </div>
          <div>{r.review}</div>
          <hr style={{ color: "#777" }} />
        </div>
      ))}
      {reviewList.length === 0 && <div>등록된 리뷰가 없습니다.</div>}

      {/* 리뷰 모달 */}
      <ReviewModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleSubmit={handleAddReview}
      />
    </div>
  );
}

export default Review;
