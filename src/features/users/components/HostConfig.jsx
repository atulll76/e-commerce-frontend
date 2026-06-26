import React, { useState } from 'react';
import { apiClient, updateApiHost } from '../../../lib/apiClient';

export function HostConfig({ onHostUpdated }) {
  const [host, setHost] = useState(apiClient.defaults.baseURL);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = () => {
    try {
      updateApiHost(host);
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
      setIsEditing(false);
      if (onHostUpdated) {
        onHostUpdated();
      }
    } catch (e) {
      setSaveStatus('Error saving host');
    }
  };

  return (
    <div style={hostConfigContainer}>
      <div style={hostLabelGroup}>
        <span style={labelText}>API Remote Host:</span>
        {isEditing ? (
          <div style={inputGroup}>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              style={hostInput}
              placeholder="e.g. http://localhost:8080/api"
            />
            <button onClick={handleSave} style={saveBtn}>Save</button>
            <button onClick={() => { setHost(apiClient.defaults.baseURL); setIsEditing(false); }} style={cancelBtn}>Cancel</button>
          </div>
        ) : (
          <div style={displayGroup}>
            <code style={hostValue}>{apiClient.defaults.baseURL}</code>
            <button onClick={() => setIsEditing(true)} style={editBtn}>Edit Host</button>
          </div>
        )}
      </div>
      {saveStatus && <span style={statusText}>{saveStatus}</span>}
    </div>
  );
}

// Inline styles
const hostConfigContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '0.75rem 1.25rem',
  marginBottom: '1.5rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
};

const hostLabelGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const labelText = {
  color: '#495057',
  fontSize: '0.85rem',
  fontWeight: '600',
};

const hostValue = {
  color: '#0ca678',
  backgroundColor: '#f1f3f5',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.85rem',
};

const inputGroup = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
};

const hostInput = {
  backgroundColor: '#ffffff',
  border: '1px solid #ced4da',
  color: '#212529',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.85rem',
  width: '280px',
  outline: 'none',
};

const saveBtn = {
  backgroundColor: '#8257e6',
  color: '#fff',
  border: 'none',
  padding: '0.25rem 0.75rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: '600',
};

const cancelBtn = {
  backgroundColor: 'transparent',
  color: '#495057',
  border: '1px solid #ced4da',
  padding: '0.25rem 0.75rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

const editBtn = {
  backgroundColor: '#f1f3f5',
  color: '#212529',
  border: '1px solid #ced4da',
  padding: '0.25rem 0.75rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  fontWeight: '600',
  transition: 'background-color 0.2s',
};

const displayGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

const statusText = {
  color: '#0ca678',
  fontSize: '0.8rem',
  fontWeight: 'bold',
};
export default HostConfig;
