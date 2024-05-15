import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv";

export interface CartState {
    products: Array<DataElement & {quantity: number}>;
    addProduct: (product: DataElement) => void;
    reduceProduct: (product: DataElement) => void;
    clearCart: () => void;
    items: () => number;
    total: () => string;
}

export const useCartStore = create<CartState>()(persist((set, get) => ({
    products: [],
    addProduct: (product) => {
        set((state) =>
        {
            let hasProduct = false;
            const products = state.products.map((p) => {
                if(p.id === product.id) {
                    hasProduct = true;
                    return {...p, quantity: p.quantity + 1};
                
                }
                return p;
            });

            if (hasProduct) {
                return {products};
            }

            return { products: [...products, {...product, quantity: 1}] }
        });
    },
    reduceProduct: (product) => {
        set((state) => {
            return {
                products: state.products.map((p) => {
                    if(p.id === product.id && p.quantity > 1) {
                        return {...p, quantity: p.quantity - 1};
                    }
                    return p;
                }).filter(p => p.quantity > 0)
            }
        });
    },
    clearCart: () => {
        set({ products: [] });
    },
    items: () => get().products.reduce((acc, p) => acc + p.quantity, 0),
    total: () => get().products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2),
}),
    {
        name: "cart",
        storage: createJSONStorage(() => zustandStorage)
    }
));