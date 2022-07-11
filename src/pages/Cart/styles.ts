import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const NoItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 126px;
    height: 126px;

    margin-bottom: 24px;
  }

  span {
    font-size: 1.5rem;
    line-height: 20px;
    font-weight: bold;
    color: #333;
  }
`;

export const Container = styled.div`
  padding: 30px;

  border-radius: 4px;

  background: #fff;

  overflow-x: auto;

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 30px;

    button {
      font-weight: bold;
      text-transform: uppercase;

      padding: 12px 20px;

      border: 0;
      border-radius: 4px;

      color: #fff;
      background: #7159c1;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }

      @media (max-width: 398px) {
        padding: 8px;
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    text-align: left;

    padding: 12px;

    color: #999;
  }

  tbody td {
    padding: 12px;

    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    display: block;

    color: #333;
  }

  span {
    display: block;

    font-size: 18px;
    font-weight: bold;

    margin-top: 5px;
  }

  div {
    display: flex;
    align-items: center;

    input {
      width: 50px;

      padding: 6px;

      border: 1px solid #ddd;
      border-radius: 4px;

      color: #666;
    }
  }

  button {
    padding: 6px;

    border: 0;

    background: none;

    svg {
      color: #7159c1;

      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#7159c1')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#7159c1')};

        cursor: not-allowed;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    font-weight: bold;

    color: #999;
  }

  strong {
    font-size: 1.5rem;

    margin-left: 5px;
  }
`;
