import { create } from "zustand";

const cartStore = create((set)=>(
    {
        cartData: [
            {id: 0, name: "White and Black", count: 2},
            {id: 1, name: "Grey Nike", count: 1},
            {id: 2, name: "Red Knit", count: 5},
        ]
    }
));

export default cartStore;