import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services';
import {
  CartContextDataProps,
  CartProviderProps,
  ProductProps,
  StockProps,
  UpdateProductAmountProps,
} from '../types';

const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps
);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductProps[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) return JSON.parse(storagedCart);

    return [];
  });

  async function addProduct(productId: number): Promise<void> {
    try {
      const selectedProduct = await api.get<ProductProps>(
        `products/${productId}`
      );

      const productStock = await api.get<StockProps>(`stock/${productId}`);

      const product = cart.find(product => product.id === productId);

      if (product && product.amount >= productStock.data.amount) {
        toast.error('Quantidade solicitada fora de estoque');

        return;
      }

      if (product) {
        const otherProductsInCart = cart.filter(
          product => product.id !== productId
        );

        const newCart = [
          ...otherProductsInCart,
          { ...selectedProduct.data, amount: product.amount + 1 },
        ];

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));

        setCart(newCart);
      } else {
        const newCart = [...cart, { ...selectedProduct.data, amount: 1 }];

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));

        setCart(newCart);
      }
    } catch {
      toast.error('Erro na adição do produto');
    }
  }

  async function removeProduct(productId: number) {
    try {
      const product = cart.find(product => product.id === productId);

      if (product) {
        const newProducts = cart.filter(product => product.id !== productId);

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newProducts));

        setCart(newProducts);
      } else {
        toast.error('Erro na remoção do produto');

        return;
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  }

  async function updateProductAmount({
    productId,
    amount,
  }: UpdateProductAmountProps) {
    try {
      if (amount <= 0) return;

      const productStock = await api.get<StockProps>(`stock/${productId}`);

      if (amount > productStock.data.amount) {
        toast.error('Quantidade solicitada fora de estoque');

        return;
      }

      const products = cart.map(product =>
        product.id === productId ? { ...product, amount } : product
      );

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(products));

      setCart(products);
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextDataProps {
  const context = useContext(CartContext);

  return context;
}
