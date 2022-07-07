import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) return JSON.parse(storagedCart);

    return [];
  });

  async function addProduct(productId: number): Promise<void> {
    try {
      const selectedProduct = await api.get<Product>(`products/${productId}`);

      const productStock = await api.get<Stock>(`stock/${productId}`);

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
      const newProducts = cart.filter(product => product.id !== productId);

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newProducts));

      setCart(newProducts);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  }

  async function updateProductAmount({
    productId,
    amount,
  }: UpdateProductAmount) {
    try {
      if (amount <= 0) return;

      const productStock = await api.get<Stock>(`stock/${productId}`);

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

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
