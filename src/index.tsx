import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { ProductInHomeProps, StockProps } from './types';

createServer({
  environment: 'development',

  models: {
    product: Model.extend<Partial<ProductInHomeProps>>({}),
    stock: Model.extend<Partial<StockProps>>({}),
  },

  seeds(server) {
    server.create('product', {
      id: '1',
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    });
    server.create('product', {
      id: '2',
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
      price: 139.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    });
    server.create('product', {
      id: '3',
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });
    server.create('product', {
      id: '4',
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    });
    server.create('product', {
      id: '5',
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
      price: 139.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    });
    server.create('product', {
      id: '6',
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    server.create('stock', {
      id: '1',
      amount: 3,
    });
    server.create('stock', {
      id: '2',
      amount: 5,
    });
    server.create('stock', {
      id: '3',
      amount: 2,
    });
    server.create('stock', {
      id: '4',
      amount: 3,
    });
    server.create('stock', {
      id: '5',
      amount: 5,
    });
    server.create('stock', {
      id: '6',
      amount: 10,
    });
  },

  routes() {
    this.namespace = 'api';

    this.urlPrefix = 'http://localhost:3333';

    this.get('/stock', () => {
      const stocks = this.schema
        .all('stock')
        .models.map(stock => stock.attrs) as StockProps[];

      const formattedStock = stocks.map(stock => ({
        ...stock,
        id: Number(stock.id),
      }));

      return formattedStock;
    });

    this.get('/stock/:id', (request, response) => {
      const { id } = response.params;

      const stock = request.findBy('stock', { id });

      if (!stock) return null;

      const formattedStock = {
        ...stock.attrs,
        id: Number(id),
      };

      return formattedStock;
    });

    this.get('/products', () => {
      const products = this.schema
        .all('product')
        .models.map(product => product.attrs) as ProductInHomeProps[];

      const formattedProducts = products.map(product => ({
        ...product,
        id: Number(product.id),
      }));

      return formattedProducts;
    });

    this.get('/products/:id', (request, response) => {
      const { id } = response.params;

      const product = request.findBy('product', { id });

      if (!product) return null;

      const formattedProduct = {
        ...product.attrs,
        id: Number(id),
      };

      return formattedProduct;
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
