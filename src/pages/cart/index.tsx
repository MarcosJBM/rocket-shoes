import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import emptyCart from '../../assets/images/empty-cart.svg';
import { useCart } from '../../hooks';
import { ProductProps } from '../../types';
import { formatPrice } from '../../utils';
import { Container, NoItems, ProductTable, Total } from './styles';

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      sumTotal += product.price * product.amount;

      return sumTotal;
    }, 0)
  );

  function handleProductIncrement(product: ProductProps) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount + 1,
    });
  }

  function handleProductDecrement(product: ProductProps) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount - 1,
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      {cartFormatted.length ? (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th aria-label='product image' />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label='delete icon' />
              </tr>
            </thead>

            <tbody>
              {cartFormatted.map(product => (
                <tr data-testid='product' key={product.id}>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>

                  <td>
                    <strong>{product.title}</strong>

                    <span>{product.priceFormatted}</span>
                  </td>

                  <td>
                    <div>
                      <button
                        type='button'
                        data-testid='decrement-product'
                        disabled={product.amount <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>

                      <input
                        type='text'
                        data-testid='product-amount'
                        readOnly
                        value={product.amount}
                      />

                      <button
                        type='button'
                        data-testid='increment-product'
                        onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>

                  <td>
                    <strong>{product.subTotal}</strong>
                  </td>

                  <td>
                    <button
                      type='button'
                      data-testid='remove-product'
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <button type='button'>Finalizar pedido</button>

            <Total>
              <span>TOTAL</span>

              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      ) : (
        <NoItems>
          <img src={emptyCart} alt='Carrinho Vazio' />

          <span>Você não possui nenhum item em seu carrinho!</span>
        </NoItems>
      )}
    </Container>
  );
}
