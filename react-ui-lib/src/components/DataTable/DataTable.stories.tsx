import type { Meta, StoryObj } from "@storybook/react";
import { fn } from 'storybook/test';
import { DataTable } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  joinDate: string;
}

const sampleUsers: User[] = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com", status: "active", role: "Developer", joinDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", age: 32, email: "jane@example.com", status: "active", role: "Designer", joinDate: "2022-11-20" },
  { id: 3, name: "Bob Johnson", age: 45, email: "bob@example.com", status: "inactive", role: "Manager", joinDate: "2021-06-10" },
  { id: 4, name: "Alice Brown", age: 29, email: "alice@example.com", status: "active", role: "Developer", joinDate: "2023-03-08" },
  { id: 5, name: "Charlie Wilson", age: 38, email: "charlie@example.com", status: "active", role: "Analyst", joinDate: "2022-09-12" },
];

const basicColumns = [
  { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true, width: "80px" },
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "age", title: "Age", dataIndex: "age" as keyof User, sortable: true, width: "100px", align: "center" as const },
  { key: "email", title: "Email", dataIndex: "email" as keyof User, sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, and customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    onRowSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    selectable: true,
    caption: "User Management Table",
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
    loadingMessage: "Fetching user data...",
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
};

export const Compact: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    compact: true,
    caption: "Compact table layout",
  },
};

export const Striped: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    striped: true,
    caption: "Striped rows for better readability",
  },
};

export const NoHover: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    hoverable: false,
    caption: "Table without hover effects",
  },
};

export const CustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true, width: "80px" },
      {
        key: "name",
        title: "Name",
        dataIndex: "name" as keyof User,
        sortable: true,
        render: (value: string) => <strong style={{ color: '#1f2937' }}>{value}</strong>
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status" as keyof User,
        sortable: true,
        align: "center" as const,
        render: (value: string) => (
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold',
              backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
              color: value === 'active' ? '#166534' : '#dc2626'
            }}
          >
            {value.toUpperCase()}
          </span>
        )
      },
      {
        key: "email",
        title: "Email",
        dataIndex: "email" as keyof User,
        render: (value: string) => <a href={`mailto:${value}`} style={{ color: '#2563eb' }}>{value}</a>
      },
    ],
    caption: "Table with custom cell rendering",
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + (i % 40),
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? 'inactive' : 'active' as const,
      role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })),
    columns: [
      { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true, width: "80px" },
      { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
      { key: "role", title: "Role", dataIndex: "role" as keyof User, sortable: true },
      { key: "age", title: "Age", dataIndex: "age" as keyof User, sortable: true, width: "100px", align: "center" as const },
      { key: "status", title: "Status", dataIndex: "status" as keyof User, sortable: true, align: "center" as const },
    ],
    selectable: true,
    striped: true,
    caption: "Large dataset with 50 users",
  },
};

export const FullFeatured: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true, width: "80px" },
      {
        key: "name",
        title: "Full Name",
        dataIndex: "name" as keyof User,
        sortable: true,
        render: (value: string, record: User) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{record.role}</div>
          </div>
        )
      },
      {
        key: "contact",
        title: "Contact",
        dataIndex: "email" as keyof User,
        render: (value: string, record: User) => (
          <div>
            <div>{value}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Age: {record.age}</div>
          </div>
        )
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status" as keyof User,
        sortable: true,
        align: "center" as const,
        render: (value: string) => (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 'bold',
              backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
              color: value === 'active' ? '#166534' : '#dc2626'
            }}
          >
            {value === 'active' ? '✓ Active' : '✗ Inactive'}
          </span>
        )
      },
      {
        key: "joinDate",
        title: "Join Date",
        dataIndex: "joinDate" as keyof User,
        sortable: true,
        align: "right" as const,
        render: (value: string) => new Date(value).toLocaleDateString()
      },
    ],
    selectable: true,
    striped: true,
    hoverable: true,
    caption: "Full-featured table with all options enabled",
  },
};
