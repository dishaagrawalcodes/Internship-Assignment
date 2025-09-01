import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const sampleUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer", status: "active", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer", status: "active", joinDate: "2022-11-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", status: "inactive", joinDate: "2021-06-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Developer", status: "active", joinDate: "2023-03-08" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Analyst", status: "active", joinDate: "2022-09-12" },
  ];

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true, width: "80px" },
    {
      key: "name",
      title: "Name",
      dataIndex: "name" as keyof User,
      sortable: true,
      render: (value: string, record: User) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{record.role}</div>
        </div>
      )
    },
    { key: "email", title: "Email", dataIndex: "email" as keyof User, sortable: true },
    {
      key: "status",
      title: "Status",
      dataIndex: "status" as keyof User,
      sortable: true,
      align: "center" as const,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${
            value === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
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
  ];

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              React UI Library Demo
            </h1>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-md transition ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Showcasing InputField and DataTable components with various features and states.
          </p>
        </div>

        {/* InputField Examples */}
        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            InputField Component
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input */}
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Search with Clear Button
              </h3>
              <InputField
                label="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or role..."
                helperText="Use the clear button to reset search"
                clearable={true}
                onClear={clearSearch}
                variant="outlined"
                size="md"
                theme={theme}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Login Form */}
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Login Form
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  helperText="We'll never share your email"
                  variant="filled"
                  theme={theme}
                />
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  invalid={password.length > 0 && password.length < 8}
                  errorMessage={password.length > 0 && password.length < 8 ? "Password must be at least 8 characters" : undefined}
                  helperText={password.length === 0 ? "Must be at least 8 characters" : undefined}
                  variant="filled"
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Examples */}
        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            DataTable Component
          </h2>

          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                User Management Table
              </h3>
              <div className="text-sm text-gray-500">
                {selectedUsers.length > 0 && `${selectedUsers.length} user(s) selected`}
              </div>
            </div>

            <DataTable
              data={isLoading ? [] : filteredUsers}
              columns={columns}
              loading={isLoading}
              selectable={true}
              onRowSelect={setSelectedUsers}
              striped={true}
              hoverable={true}
              caption="User data with sorting and selection capabilities"
              emptyMessage={searchTerm ? `No users found matching "${searchTerm}"` : "No users available"}
              loadingMessage="Searching users..."
            />

            {selectedUsers.length > 0 && (
              <div className={`mt-4 p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                  Selected Users:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(user => (
                    <span
                      key={user.id}
                      className={`px-2 py-1 rounded text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-600 text-gray-200'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Component Variants Demo */}
        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Component Variants
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Variants */}
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input Variants
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Filled Variant"
                  placeholder="Filled input"
                  variant="filled"
                  theme={theme}
                />
                <InputField
                  label="Outlined Variant"
                  placeholder="Outlined input"
                  variant="outlined"
                  theme={theme}
                />
                <InputField
                  label="Ghost Variant"
                  placeholder="Ghost input"
                  variant="ghost"
                  theme={theme}
                />
              </div>
            </div>

            {/* Input Sizes */}
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input Sizes
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Small Size"
                  placeholder="Small input"
                  size="sm"
                  theme={theme}
                />
                <InputField
                  label="Medium Size"
                  placeholder="Medium input"
                  size="md"
                  theme={theme}
                />
                <InputField
                  label="Large Size"
                  placeholder="Large input"
                  size="lg"
                  theme={theme}
                />
              </div>
            </div>

            {/* Input States */}
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Input States
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Normal State"
                  placeholder="Normal input"
                  helperText="This is a normal input"
                  theme={theme}
                />
                <InputField
                  label="Error State"
                  placeholder="Invalid input"
                  invalid={true}
                  errorMessage="This field has an error"
                  theme={theme}
                />
                <InputField
                  label="Disabled State"
                  placeholder="Disabled input"
                  disabled={true}
                  helperText="This input is disabled"
                  theme={theme}
                />
                <InputField
                  label="Loading State"
                  placeholder="Loading..."
                  loading={true}
                  helperText="This input is loading"
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>React UI Library Demo - Built with TypeScript, Tailwind CSS, and Storybook</p>
          <p className="text-sm mt-2">
            Features: Accessibility, Responsive Design, Theme Support, and Comprehensive Testing
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
