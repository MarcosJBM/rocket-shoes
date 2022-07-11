import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { useCart } from '../../hooks';
import { Cart, Container } from './styles';

export function Header() {
  const { cart } = useCart();

  const itemsInCart = cart.length;

  return (
    <Container>
      <Link to='/'>
        <img src={logo} alt='Rocketshoes' />
      </Link>

      <Cart to='/cart'>
        <div>
          <strong>Meu carrinho</strong>

          <span data-testid='cart-size'>
            {itemsInCart === 1 ? `${itemsInCart} item` : `${itemsInCart} itens`}
          </span>
        </div>

        <MdShoppingBasket size={36} color='#FFF' />
      </Cart>
    </Container>
  );
}
