import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Tooltip} from './Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip label="Save this summary"><button>Save</button></Tooltip>);
    expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
  });

  it('renders the tooltip label in the DOM', () => {
    render(<Tooltip label="Save this summary"><button>Save</button></Tooltip>);
    expect(screen.getByText('Save this summary')).toBeInTheDocument();
  });

  it('tooltip label has opacity-0 class by default', () => {
    render(<Tooltip label="Save this summary"><button>Save</button></Tooltip>);
    const label = screen.getByText('Save this summary');
    expect(label).toHaveClass('opacity-0');
  });

  it('tooltip label has group-hover class for CSS-driven visibility', () => {
    render(<Tooltip label="Save this summary"><button>Save</button></Tooltip>);
    const label = screen.getByText('Save this summary');
    expect(label).toHaveClass('group-hover:opacity-100');
  });
});
