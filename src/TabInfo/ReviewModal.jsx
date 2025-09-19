// ReviewModal.jsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ReviewModal({ show, handleClose, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [point, setPoint] = useState(0); // state 추가
  const [hoverPoint, setHoverPoint] = useState(0); // 마우스를 올린 상태

  // renderStars 함수 안 수정
  const displayPoint = hoverPoint || point; // hoverPoint가 있으면 그걸 표시

  // 0.5점 단위 별점 렌더링
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starPercent = 0;
      if (displayPoint >= i) starPercent = 100;
      else if (displayPoint >= i - 0.5) starPercent = 50;

      stars.push(
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setPoint(i); // 1점 단위로 저장
          }}
          onMouseMove={() => {
            setHoverPoint(i);
          }}
          onMouseLeave={() => setHoverPoint(0)}
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

  const onSubmit = () => {
    if (!title || !review || point === 0) {
      alert("제목, 리뷰, 별점을 모두 입력해주세요.");
      return;
    }
    handleSubmit({ title, review, point: Number(point) });
    setTitle("");
    setReview("");
    setPoint(0);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: "1rem" }}>
          <label>별점</label>
          <div>{renderStars()}</div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>리뷰</label>
          <textarea
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
