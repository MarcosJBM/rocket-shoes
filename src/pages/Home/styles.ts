import { darken } from 'polished';
import styled from 'styled-components';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 946px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 492px) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    flex-direction: column;

    padding: 20px;

    border-radius: 4px;

    background: #fff;

    img {
      align-self: center;

      max-width: 250px;
      width: 100%;
    }

    > strong {
      font-size: 1rem;

      line-height: 20px;

      margin-top: 5px;

      color: #333;
    }

    > span {
      font-size: 1.25rem;
      font-weight: bold;

      margin: 5px 0 20px;
    }

    button {
      display: flex;
      align-items: center;

      margin-top: auto;

      border: 0;
      border-radius: 4px;

      color: #fff;
      background: #7159c1;

      overflow: hidden;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;

        padding: 12px;

        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;

        font-weight: bold;
        text-align: center;
      }
    }
  }
`;
