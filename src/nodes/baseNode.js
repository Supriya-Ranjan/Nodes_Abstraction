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
    [FIELD_VALUES.URL]: () => 'https://vectorshift.ai',
    [FIELD_VALUES.CONDITION]: () => 'None',
    [FIELD_VALUES.ENDPOINT]: () => '/example',
    [FIELD_VALUES.EXPRESSION]: () => 'a+b',
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
    <div className='node'>
      {/* Title */}
      <div className='node-title'>{title}</div>

      {/* Form Fields */}
      <div className='node-fields'>
        {fields.map((field) => {
          if (field.type === FIELD_TYPES.SELECT) {
            return (
              <label key={field.key} className='node-select-box'>
                <span className='node-select-title'>{field.label}:</span>
                <select
                  value={state[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className='node-select'
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
                className='node-text'
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
