import {render, screen} from '@testing-library/react';
import React from 'react';

import {MarkdownRenderer} from './MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('renders a heading for lines starting with ##', () => {
    render(<MarkdownRenderer text="## Overview" />);
    expect(screen.getByRole('heading', {name: 'Overview'})).toBeInTheDocument();
  });

  it('renders a list item for lines starting with -', () => {
    render(<MarkdownRenderer text="- Buy low, sell high" />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Buy low, sell high');
  });

  it('renders a list item for lines starting with *', () => {
    render(<MarkdownRenderer text="* Stay diversified" />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Stay diversified');
  });

  it('renders a blockquote for lines starting with >', () => {
    render(<MarkdownRenderer text="> Price is what you pay." />);
    expect(screen.getByRole('blockquote')).toHaveTextContent('Price is what you pay.');
  });

  it('renders a paragraph for plain text', () => {
    render(<MarkdownRenderer text="This is a plain paragraph." />);
    expect(screen.getByText('This is a plain paragraph.')).toBeInTheDocument();
  });

  it('strips bold markers from text', () => {
    render(<MarkdownRenderer text="**Margin of Safety** is key." />);
    expect(screen.getByText('Margin of Safety is key.')).toBeInTheDocument();
  });

  it('shows streaming cursor when isStreaming is true', () => {
    const {container} = render(
      <MarkdownRenderer text="Loading..." isStreaming={true} />,
    );
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('hides streaming cursor when isStreaming is false', () => {
    const {container} = render(
      <MarkdownRenderer text="Done." isStreaming={false} />,
    );
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('renders multiple lines correctly', () => {
    const text = '## Core Ideas\n- Invest for the long term\n- Avoid speculation';
    render(<MarkdownRenderer text={text} />);
    expect(screen.getByRole('heading', {name: 'Core Ideas'})).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
