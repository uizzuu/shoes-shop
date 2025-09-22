import { create } from "zustand";

const cartStore = create((set) => ({
  cartData: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Nike", count: 1 },
    { id: 2, name: "Red Knit", count: 5 },
  ],
  // 데이터 추가
  addItem: (item) =>
    set((state) => ({
      cartData: [...state.cartData, item],
    })),
  // id 만 받아서 삭제 처리
  removeItem: (id) =>
    set((state) => ({
      cartData: state.cartData.filter((x) => x.id !== id),
    })),
  // id 와 form 객체를 받아서 수정
  updateItem: (id, updates) =>
    set((state) => ({
      cartData: state.cartData.map((x) =>
        x.id === id ? { ...x, ...updates } : x
      ),
    })),
}));

export default cartStore;
