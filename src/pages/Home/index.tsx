import { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useCart } from '../../hooks';
import { api } from '../../services';
import {
  CartItemsAmountProps,
  ProductFormattedProps,
  ProductInHomeProps,
} from '../../types';
import { formatPrice } from '../../utils';
import { ProductList } from './styles';

export function Home() {
  const [products, setProducts] = useState<ProductFormattedProps[]>([]);

  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((cartItem, product) => {
    cartItem[product.id] = product.amount;

    return cartItem;
  }, {} as CartItemsAmountProps);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get<ProductInHomeProps[]>('/products');

        setProducts(oldState => [
          ...oldState,
          ...data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
          })),
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id.toString()}>
          <img src={product.image} alt={product.title} />

          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button
            type='button'
            data-testid='add-product-button'
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid='cart-product-quantity'>
              <MdAddShoppingCart size={16} color='#FFF' />

              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
