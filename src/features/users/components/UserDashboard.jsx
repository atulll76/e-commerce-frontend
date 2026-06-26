import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { HostConfig } from './HostConfig';
import { UserForm } from './UserForm';

export function UserDashboard() {
  const {
    users,
    isLoading,
    error,
    isOffline,
    skip,
    limit,
    addUser,
    editUser,
    removeUser,
    nextPage,
    prevPage,
    refetch
  } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionError, setActionError] = useState('');

  const handleFormSubmit = async (payload) => {
    setActionError('');
    try {
      if (editingUser) {
        await editUser(editingUser.id, payload);
      } else {
        await addUser(payload);
      }
      setShowForm(false);
      setEditingUser(null);
    } catch (err) {
      setActionError(err.message || 'Operation failed');
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowForm(true);
    setSelectedUser(null);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user profile?')) {
      setActionError('');
      try {
        await removeUser(userId);
        if (selectedUser?.id === userId) {
          setSelectedUser(null);
        }
      } catch (err) {
        setActionError(err.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div style={dashboardContainer}>
      <header style={dashboardHeader}>
        <h1 style={dashboardTitle}>E-Commerce Admin Portal</h1>
        <p style={dashboardSubtitle}>Manage user profiles, registration details, and client endpoints.</p>
      </header>

      {/* API Host Configuration */}
      <HostConfig onHostUpdated={refetch} />

      {/* Connection Mode Alert */}
      {error && (
        <div style={errorAlert}>
          <strong>Connection Error:</strong> Backend API is currently unreachable ({error.message || 'Network Error'}). Please check your remote host configuration or backend logs.
        </div>
      )}

      {actionError && (
        <div style={errorAlert}>
          <strong>Error:</strong> {actionError}
        </div>
      )}

      {/* Actions Bar */}
      <div style={actionBar}>
        <h2 style={sectionTitle}>User Profiles</h2>
        {!showForm && (
          <button onClick={() => { setEditingUser(null); setShowForm(true); }} style={createUserBtn}>
            + Add New User
          </button>
        )}
      </div>

      {/* Main Workspace */}
      <div style={workspaceLayout}>
        <div style={mainContentArea}>
          {showForm ? (
            <UserForm
              user={editingUser}
              onSubmit={handleFormSubmit}
              onCancel={() => { setShowForm(false); setEditingUser(null); }}
            />
          ) : isLoading ? (
            <div style={stateCard}>Loading user profiles...</div>
          ) : users.length === 0 ? (
            <div style={stateCard}>
              <p>No user profiles found.</p>
              {isOffline && (
                <button onClick={() => window.location.reload()} style={retryBtn}>Re-initialize Mock Data</button>
              )}
            </div>
          ) : (
            <div style={tableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Username</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={tableRow} onClick={() => setSelectedUser(u)}>
                      <td style={tdStyle}>{u.first_name} {u.last_name}</td>
                      <td style={tdStyle}><code style={codeStyle}>{u.username}</code></td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}>{u.phone_number || '-'}</td>
                      <td style={{ ...tdStyle, onClick: (e) => e.stopPropagation() }}>
                        <div style={actionGroup} onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleEditClick(u)} style={editActionBtn}>Edit</button>
                          <button onClick={() => handleDeleteClick(u.id)} style={deleteActionBtn}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination controls */}
              <div style={paginationStyle}>
                <button onClick={prevPage} disabled={skip === 0} style={pageBtn}>
                  &larr; Previous Page
                </button>
                <span style={pageIndicator}>Records: {skip + 1} - {skip + users.length}</span>
                <button onClick={nextPage} disabled={users.length < limit} style={pageBtn}>
                  Next Page &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected User Detail Card Panel */}
        {selectedUser && !showForm && (
          <div style={detailPanel}>
            <div style={detailHeader}>
              <h3 style={detailTitle}>User Details</h3>
              <button onClick={() => setSelectedUser(null)} style={closeDetailBtn}>&times;</button>
            </div>
            <div style={detailBody}>
              <div style={detailItem}>
                <span style={detailLabel}>ID</span>
                <span style={detailValue}>{selectedUser.id}</span>
              </div>
              <div style={detailItem}>
                <span style={detailLabel}>Full Name</span>
                <span style={detailValue}>{selectedUser.first_name} {selectedUser.last_name}</span>
              </div>
              <div style={detailItem}>
                <span style={detailLabel}>Username</span>
                <span style={detailValue}><code style={codeStyle}>{selectedUser.username}</code></span>
              </div>
              <div style={detailItem}>
                <span style={detailLabel}>Email</span>
                <span style={detailValue}>{selectedUser.email}</span>
              </div>
              <div style={detailItem}>
                <span style={detailLabel}>Phone Number</span>
                <span style={detailValue}>{selectedUser.phone_number || 'N/A'}</span>
              </div>
              <div style={detailItem}>
                <span style={detailLabel}>Date of Birth</span>
                <span style={detailValue}>{selectedUser.date_of_birth || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Styles
const dashboardContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color: '#212529',
};

const dashboardHeader = {
  marginBottom: '2rem',
  borderBottom: '1px solid #dee2e6',
  paddingBottom: '1rem',
};

const dashboardTitle = {
  fontSize: '2.25rem',
  margin: 0,
  background: 'linear-gradient(90deg, #8257e6 0%, #0ca678 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const dashboardSubtitle = {
  color: '#495057',
  fontSize: '0.95rem',
  margin: '0.5rem 0 0 0',
};

const offlineAlert = {
  backgroundColor: '#fff9db',
  border: '1px solid #f59f00',
  color: '#f08c00',
  padding: '0.75rem 1.25rem',
  borderRadius: '6px',
  marginBottom: '1.5rem',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

const offlineBadge = {
  backgroundColor: '#f59f00',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
};

const errorAlert = {
  backgroundColor: '#fff5f5',
  border: '1px solid #ffc9c9',
  color: '#fa5252',
  padding: '0.75rem 1.25rem',
  borderRadius: '6px',
  marginBottom: '1.5rem',
  fontSize: '0.875rem',
};

const actionBar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.25rem',
};

const sectionTitle = {
  margin: 0,
  fontSize: '1.4rem',
  color: '#212529',
};

const createUserBtn = {
  backgroundColor: '#0ca678',
  color: '#ffffff',
  border: 'none',
  padding: '0.6rem 1.25rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  transition: 'background-color 0.2s',
};

const workspaceLayout = {
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

const mainContentArea = {
  flex: '1 1 65%',
  minWidth: '320px',
};

const detailPanel = {
  flex: '1 1 30%',
  minWidth: '280px',
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '1.25rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
};

const detailHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #dee2e6',
  paddingBottom: '0.75rem',
  marginBottom: '1rem',
};

const detailTitle = {
  margin: 0,
  fontSize: '1.1rem',
  color: '#212529',
};

const closeDetailBtn = {
  background: 'none',
  border: 'none',
  color: '#868e96',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const detailBody = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const detailItem = {
  display: 'flex',
  flexDirection: 'column',
};

const detailLabel = {
  fontSize: '0.75rem',
  color: '#868e96',
  textTransform: 'uppercase',
  marginBottom: '0.2rem',
};

const detailValue = {
  fontSize: '0.95rem',
  color: '#212529',
};

const stateCard = {
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '3rem',
  textAlign: 'center',
  color: '#868e96',
};

const retryBtn = {
  backgroundColor: '#8257e6',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  marginTop: '1rem',
  cursor: 'pointer',
  fontSize: '0.85rem',
};

const tableWrapper = {
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '0.9rem',
};

const tableHeaderRow = {
  borderBottom: '2px solid #dee2e6',
  backgroundColor: '#f8f9fa',
};

const thStyle = {
  padding: '1rem 1.25rem',
  color: '#495057',
  fontWeight: '600',
};

const tableRow = {
  borderBottom: '1px solid #dee2e6',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const tdStyle = {
  padding: '1rem 1.25rem',
  color: '#212529',
};

const codeStyle = {
  color: '#8257e6',
  backgroundColor: '#f1f3f5',
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.8rem',
};

const actionGroup = {
  display: 'flex',
  gap: '0.5rem',
};

const editActionBtn = {
  backgroundColor: '#f1f3f5',
  color: '#212529',
  border: '1px solid #ced4da',
  padding: '0.35rem 0.75rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

const deleteActionBtn = {
  backgroundColor: 'transparent',
  border: '1px solid #fa5252',
  color: '#fa5252',
  padding: '0.35rem 0.75rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 1.25rem',
  borderTop: '1px solid #dee2e6',
  backgroundColor: '#f8f9fa',
};

const pageBtn = {
  backgroundColor: '#f1f3f5',
  color: '#212529',
  border: '1px solid #ced4da',
  padding: '0.4rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  }
};

const pageIndicator = {
  color: '#495057',
  fontSize: '0.85rem',
};
export default UserDashboard;
