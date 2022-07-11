import { ReactNode } from 'react';

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export interface StockProps {
  id: number;
  amount: number;
}

export interface CartProviderProps {
  children: ReactNode;
}

export interface UpdateProductAmountProps {
  productId: number;
  amount: number;
}

export interface CartContextDataProps {
  cart: ProductProps[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({
    productId,
    amount,
  }: UpdateProductAmountProps) => void;
}
