import { render, screen } from '@testing-library/react';

import React from 'react';
import { act } from 'react';

test.only('renders Hello World', () => {
  act(() => {
    render(<div>Hello World</div>);
  });
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
