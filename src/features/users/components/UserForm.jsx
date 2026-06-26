import React, { useState, useEffect } from 'react';

export function UserForm({ user, onSubmit, onCancel }) {
  const isEditMode = !!user;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    phone_number: '',
    date_of_birth: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        email: user.email || '',
        password: '', // Do not pre-fill passwords on edit
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || ''
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        phone_number: '',
        date_of_birth: ''
      });
    }
    setErrors({});
  }, [user]);

  const validate = () => {
    const tempErrors = {};
    if (!formData.first_name.trim()) tempErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) tempErrors.last_name = 'Last name is required';
    if (!formData.username.trim()) tempErrors.username = 'Username is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (!isEditMode && !formData.password) {
      tempErrors.password = 'Password is required';
    } else if (!isEditMode && formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build payload. For edits, exclude password if blank
    const payload = { ...formData };
    if (isEditMode && !payload.password) {
      delete payload.password;
    }
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={formContainer}>
      <h3 style={formTitle}>{isEditMode ? 'Edit User Profile' : 'Create New User'}</h3>
      
      <div style={rowStyle}>
        <div style={fieldContainer}>
          <label style={labelStyle}>First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            style={errors.first_name ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.first_name && <span style={errorTextStyle}>{errors.first_name}</span>}
        </div>
        
        <div style={fieldContainer}>
          <label style={labelStyle}>Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            style={errors.last_name ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.last_name && <span style={errorTextStyle}>{errors.last_name}</span>}
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldContainer}>
          <label style={labelStyle}>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={errors.username ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
            disabled={isEditMode} // Usually username isn't editable
          />
          {errors.username && <span style={errorTextStyle}>{errors.username}</span>}
        </div>

        <div style={fieldContainer}>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={errors.email ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </div>
      </div>

      {!isEditMode && (
        <div style={fieldContainer}>
          <label style={labelStyle}>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={errors.password ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.password && <span style={errorTextStyle}>{errors.password}</span>}
        </div>
      )}

      <div style={rowStyle}>
        <div style={fieldContainer}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            placeholder="+919876543210"
            value={formData.phone_number}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fieldContainer}>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={actionsContainer}>
        <button type="button" onClick={onCancel} style={cancelBtn}>Cancel</button>
        <button type="submit" style={submitBtn}>{isEditMode ? 'Update User' : 'Create Profile'}</button>
      </div>
    </form>
  );
}

// Inline styles
const formContainer = {
  backgroundColor: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '1.5rem',
  marginBottom: '2rem',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
};

const formTitle = {
  marginTop: 0,
  marginBottom: '1.25rem',
  color: '#212529',
  fontSize: '1.2rem',
  borderBottom: '1px solid #dee2e6',
  paddingBottom: '0.5rem',
};

const rowStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

const fieldContainer = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 calc(50% - 0.5rem)',
  minWidth: '200px',
};

const labelStyle = {
  fontSize: '0.8rem',
  fontWeight: 'bold',
  color: '#495057',
  marginBottom: '0.4rem',
};

const inputStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #ced4da',
  color: '#212529',
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  outline: 'none',
  fontSize: '0.9rem',
  transition: 'border-color 0.2s',
};

const inputErrorStyle = {
  borderColor: '#c53030',
};

const errorTextStyle = {
  color: '#f56565',
  fontSize: '0.75rem',
  marginTop: '0.25rem',
};

const actionsContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  marginTop: '1.5rem',
  borderTop: '1px solid #dee2e6',
  paddingTop: '1rem',
};

const cancelBtn = {
  backgroundColor: 'transparent',
  border: '1px solid #ced4da',
  color: '#495057',
  padding: '0.5rem 1.25rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

const submitBtn = {
  backgroundColor: '#8257e6',
  border: 'none',
  color: '#ffffff',
  padding: '0.5rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 'bold',
};
export default UserForm;
