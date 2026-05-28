import { screen, render } from '@testing-library/react';

import Input from '.';

describe('Input component', () => {
  it('should render with label and icon', () => {
    render(
      <Input
        type="text"
        id="username"
        label="Username"
        icon={<span>Icon</span>}
      />,
    );

    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    const icon = screen.getByText(/icon/i);

    expect(icon).toBeVisible();

    expect(input).toBeVisible();
    expect(input).toBeEnabled();
    expect(input).not.toHaveFocus();
  });

  it('should render without label and icon', () => {
    render(<Input type="text" id="username" />);

    const icon = screen.queryByText(/icon/i);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(icon).toBeNull();

    expect(input).toBeVisible();
    expect(input).toBeEnabled();
    expect(input).not.toHaveFocus();
    expect(input).toHaveTextContent('');
  });
});
