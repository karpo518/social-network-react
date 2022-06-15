import { render } from '@testing-library/react';

import SamuraiJSApp from './App';

test('renders Menu text', async () => {
  render(<SamuraiJSApp />);
  // const linkElement = screen.getByText(/proverka/i);
  // expect(linkElement).toBeInTheDocument();
});
