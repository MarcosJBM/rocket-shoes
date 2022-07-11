import { ProductProps } from '../../hooks';

export type ProductInHomeProps = Omit<ProductProps, 'amount'>;

export interface ProductFormattedProps extends ProductInHomeProps {
  priceFormatted: string;
}

export interface CartItemsAmountProps {
  [key: number]: number;
}
