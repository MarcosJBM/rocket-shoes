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
        setCart(oldCart => [
          ...oldCart,
          { ...selectedProduct.data, amount: 1 },
        ]);
      }
    } catch {
      toast.error('Erro na adição do produto');
    }
  }

  async function removeProduct(productId: number) {
    try {
      const newProducts = cart.filter(product => product.id !== productId);

      setCart(newProducts);
    } catch {
      toast.error('Não foi possível remover o produto!');
    }
  }

  async function updateProductAmount({
    productId,
    amount,
  }: UpdateProductAmount) {
    try {
      const products = cart.map(product =>
        product.id === productId ? { ...product, amount } : product
      );

      setCart(products);
    } catch {
      toast.error('Não foi possível atualizar a quantidade do produto!');
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
