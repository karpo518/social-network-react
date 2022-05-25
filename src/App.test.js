import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import React from "react";
import SamuraiJSApp from './App';

test('renders Menu text', async () => {
  render(<SamuraiJSApp />);
  // const linkElement = screen.getByText(/proverka/i);
  // expect(linkElement).toBeInTheDocument();
});
