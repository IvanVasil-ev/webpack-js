import React from 'react';
import { sum } from './utils';
import image from './assets/image.jpeg';

export const App = () => (
  <>
    <img src={image} alt="image" />
    <h1>Очень интересно, что 3 + 2 будет {sum(3, 2)}!</h1>
    <p>I like games.</p>
  </>
);
