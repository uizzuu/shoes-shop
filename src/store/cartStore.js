import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const cartStore = create(
  immer((set) => ({
    // 카트 초기화
    cartData: [
      //   { id: 0, name: "White and Black", count: 2, price: 120000 },
      //   { id: 1, name: "Grey Nike", count: 1, price: 130000 },
    ],
    plusCount: (id) =>
      set((state) => {
        const item = state.cartData.find((x) => x.id === id);
        if (item) item.count += 1;
      }),
    minusCount: (id) =>
      set((state) => {
        const item = state.cartData.find((x) => x.id === id);
        if (item && item.count > 1) item.count -= 1;
      }),
    addItem: (item) =>
      set((state) => {
        const findItem = state.cartData.find((x) => x.id === item.id);
        if (findItem) {
          // 수량만 증가
          findItem.count += item.count;
        } else {
          state.cartData.push(item);
        }
      }),
    // 선생님 필기 복사
    // addItem: (item) => 
    //     set((state)=>{
    //         const findItem = state.cartData.find((x) => x.id === item.id);
    //         // null, undefind, "" => if(findItem)
    //         let insertItem = {}
    //         // count 에 1 주고 추가 
    //         if(! findItem){
    //             insertItem = {
    //                 ... item,
    //                 count: 1
    //             }
    //             // state 에 추가
    //             state.cartData.push(insertItem)
    //         } else 
    //         findItem.count++;
    //         }
    //     }),
    updateItem: (id, updates) =>
      set((state) => ({
        cartData: state.cartData.map((x) =>
          x.id === id ? { ...x, ...updates } : x
        ),
      })),
    removeItem: (id) =>
      set((state) => {
        const idx = state.cartData.findIndex((x) => x.id === id);
        if (idx !== -1) state.cartData.splice(idx, 1);
      }),
    // 카트 전체 삭제
    removeAll: () => {
      set({ cartData: [] });
    },
    // 선생님 필기 복사
    // clearAll: () => set((state) => ({ ...state, cartData: [] })),

    // 안쓰는 내용들
    // updateItem: (id, updates) =>
    //     set((state) => {
    //         // 수정할 객체 먼저 찾기
    //         const item = state.cartData.find((x)=> x.id === id);
    //         if(item){
    //             // name 이 공백이 아닌 경우
    //             if(updates.name !== "") {
    //                 item.name = updates.name;
    //             }
    //             // 수량이 숫자로 오면 변경
    //             if(typeof updates.count === "number" && ! Number.isNaN(updates.count)){
    //                 item.count = updates.count;
    //             }
    //         }
    //     })

    //   데이터 추가
    //   addItem: (item) =>
    //     set((state) => ({
    //       cartData: [...state.cartData, item],
    //     })),
    //   id 만 받아서 삭제 처리
    //   removeItem: (id) =>
    //     set((state) => ({
    //       cartData: state.cartData.filter((x) => x.id !== id),
    //     })),
    //   id 와 form 객체를 받아서 수정
  }))
);

export default cartStore;
