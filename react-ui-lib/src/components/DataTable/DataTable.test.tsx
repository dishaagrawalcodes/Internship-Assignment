import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from './DataTable';

interface TestUser {
  id: number;
  name: string;
  age: number;
  email: string;
}

const mockData: TestUser[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
];

const mockColumns = [
  { key: 'id', title: 'ID', dataIndex: 'id' as keyof TestUser, sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestUser, sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof TestUser, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof TestUser },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={mockColumns} loading={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={mockColumns} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(<DataTable data={[]} columns={mockColumns} emptyMessage="No users found" />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('shows custom loading message', () => {
    render(<DataTable data={[]} columns={mockColumns} loading={true} loadingMessage="Fetching data..." />);

    expect(screen.getByText('Fetching data...')).toBeInTheDocument();
  });

  describe('Sorting', () => {
    it('sorts data when sortable column header is clicked', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      const rows = screen.getAllByRole('row');
      // First row is header, so data rows start from index 1
      expect(rows[1]).toHaveTextContent('Bob Johnson');
      expect(rows[2]).toHaveTextContent('Jane Smith');
      expect(rows[3]).toHaveTextContent('John Doe');
    });

    it('reverses sort order on second click', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader); // First click - ascending
      fireEvent.click(nameHeader); // Second click - descending

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('John Doe');
      expect(rows[2]).toHaveTextContent('Jane Smith');
      expect(rows[3]).toHaveTextContent('Bob Johnson');
    });

    it('shows sort indicators', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const nameHeader = screen.getByText('Name');
      fireEvent.click(nameHeader);

      expect(nameHeader.parentElement).toHaveTextContent('↑');
    });

    it('does not sort non-sortable columns', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const emailHeader = screen.getByText('Email');
      fireEvent.click(emailHeader);

      // Data should remain in original order
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('John Doe');
      expect(rows[2]).toHaveTextContent('Jane Smith');
      expect(rows[3]).toHaveTextContent('Bob Johnson');
    });
  });

  describe('Row Selection', () => {
    it('shows checkboxes when selectable', () => {
      render(<DataTable data={mockData} columns={mockColumns} selectable={true} />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 3 data rows + 1 select all
    });

    it('selects individual rows', () => {
      const onRowSelect = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={onRowSelect} />);

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Click first data row checkbox

      expect(onRowSelect).toHaveBeenCalledWith([mockData[0]]);
    });

    it('selects all rows with select all checkbox', () => {
      const onRowSelect = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={onRowSelect} />);

      const selectAllCheckbox = screen.getByLabelText('Select all rows');
      fireEvent.click(selectAllCheckbox);

      expect(onRowSelect).toHaveBeenCalledWith(mockData);
    });

    it('deselects all rows when select all is clicked again', () => {
      const onRowSelect = vi.fn();
      render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={onRowSelect} />);

      const selectAllCheckbox = screen.getByLabelText('Select all rows');
      fireEvent.click(selectAllCheckbox); // Select all
      fireEvent.click(selectAllCheckbox); // Deselect all

      expect(onRowSelect).toHaveBeenLastCalledWith([]);
    });
  });

  describe('Accessibility', () => {
    it('has proper table role', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('has column headers with proper scope', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const headers = screen.getAllByRole('columnheader');
      headers.forEach(header => {
        expect(header).toHaveAttribute('scope', 'col');
      });
    });

    it('supports keyboard navigation for sortable columns', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const nameHeader = screen.getByText('Name');
      expect(nameHeader.parentElement).toHaveAttribute('tabIndex', '0');
      expect(nameHeader.parentElement).toHaveAttribute('role', 'button');
    });

    it('has proper aria-sort attributes', () => {
      render(<DataTable data={mockData} columns={mockColumns} />);

      const nameHeader = screen.getByText('Name').parentElement;
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');

      fireEvent.click(nameHeader!);
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      fireEvent.click(nameHeader!);
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    });

    it('shows caption when provided', () => {
      render(<DataTable data={mockData} columns={mockColumns} caption="User data table" />);

      expect(screen.getByText('User data table')).toBeInTheDocument();
    });
  });

  describe('Custom rendering', () => {
    it('uses custom render function when provided', () => {
      const customColumns = [
        {
          key: 'name',
          title: 'Name',
          dataIndex: 'name' as keyof TestUser,
          render: (value: string) => <strong>{value.toUpperCase()}</strong>
        }
      ];

      render(<DataTable data={mockData} columns={customColumns} />);

      expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.getByText('JANE SMITH')).toBeInTheDocument();
    });
  });

  describe('Styling options', () => {
    it('applies compact styling', () => {
      render(<DataTable data={mockData} columns={mockColumns} compact={true} />);

      expect(screen.getByRole('table')).toHaveClass('text-sm');
    });

    it('applies hoverable styling', () => {
      render(<DataTable data={mockData} columns={mockColumns} hoverable={true} />);

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1]; // First data row
      expect(dataRow).toHaveClass('hover:bg-gray-50');
    });
  });
});
