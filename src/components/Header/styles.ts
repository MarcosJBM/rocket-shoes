import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 50px 0;

  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    max-width: 276px;
    width: 100%;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;

  text-decoration: none;

  div {
    text-align: right;

    margin-right: 10px;

    strong {
      display: block;

      color: #fff;
    }

    span {
      font-size: 0.75rem;

      color: #999;
    }
  }
`;
