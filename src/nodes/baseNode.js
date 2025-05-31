// /src/nodes/baseNode.js

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { FIELD_TYPES, FIELD_VALUES } from '../enum/nodes';

export const BaseNode = ({
  id,
  data,
  title = 'Untitled',
  fields = [],
  handles = [],
  defaultFieldsValue,
}) => {
  const defaultFieldValues = {
    [FIELD_VALUES.INPUT_NAME]: () => id.replace(defaultFieldsValue?.prev, defaultFieldsValue?.curr),
    [FIELD_VALUES.INPUT_TYPE]: () => 'Text',
    [FIELD_VALUES.TEXT]: () => '{{input}}',
  };

  const initialState = fields.reduce((acc, field) => {
    const fallback = defaultFieldValues[field.key];
    acc[field.key] = data?.[field.key] ?? (fallback ? fallback() : '');
    return acc;
  }, {});

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // You can sync to global store or backend if needed
    // console.log('Updated node state:', state);
  }, [state]);

  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      style={{
        width: 220,
        minHeight: 100,
        padding: 10,
        border: '1px solid #333',
        borderRadius: 8,
        background: '#1C2536',
        color: 'white',
        fontSize: 13,
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{title}</div>

      {/* Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {fields.map((field) => {
          if (field.type === FIELD_TYPES.SELECT) {
            return (
              <label key={field.key} style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '4px' }}>{field.label}:</span>
                <select
                  value={state[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '14px',
                  }}
                >
                  {field.options.map((opt) => (
                    <option key={opt.key} value={opt.value}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          // For text/number/etc. fields
          return (
            <label key={field.key}>
              {field.label}:
              {field.type ? <input
                type={field.type}
                value={state[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                style={{
                  marginLeft: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px',
                }}
              /> : null}
            </label>
          );
        })}
      </div>

      {/* handles */}
      {handles?.map((handle) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={Position[handle.position]}
          id={`${id}-${handle.id}`}
          className={`handle ${handle.className || ''}`}
        />
      ))}
    </div>
  );
};
