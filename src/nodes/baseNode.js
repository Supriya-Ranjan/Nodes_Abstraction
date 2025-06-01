// /src/nodes/baseNode.js
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { FIELD_TYPES, FIELD_VALUES, NODE_TYPES } from '../enum/nodes';

const isValidVariable = (name) => /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name);

export const BaseNode = ({
  id,
  data,
  nodeKey = 'nodeKey',
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

  const [variables, setVariables] = useState([]);
  const initialState = fields.reduce((acc, field) => {
    const fallback = defaultFieldValues[field.key];
    acc[field.key] = data?.[field.key] ?? (fallback ? fallback() : '');
    return acc;
  }, {});

  const [state, setState] = useState(initialState);

  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  // Extract variables from double curly braces and validate them
  const extractVariables = () => {
    console.log(state.text);

    const matches = Array.from(state?.text.matchAll(/\{\{(.*?)\}\}/g));
    return matches
      .map((match) => match[1].trim())
      .filter(isValidVariable);
  };

  useEffect(() => {
    if (nodeKey === NODE_TYPES.TEXT_NODES) {
      const vars = extractVariables();
      setVariables(vars);
      resizeTextarea();
    }
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
            <label className='node-text-container' key={field.key}>
              {field.label}:
              {field.type ? <textarea
                ref={textareaRef}
                type={field.type}
                value={state[field.key] || ''}
                onChange={(e) => {
                  handleChange(field.key, e.target.value);
                  if (nodeKey === NODE_TYPES.TEXT_NODES) {
                    resizeTextarea();
                  }
                }}
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

      {/* Dynamically created left-side input handles for each variable */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-var-${variable}`}
          style={{
            top: `${(index + 1) * 25}px`,
            background: '#555',
          }}
        />
      ))}
    </div>
  );
};

BaseNode.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.object,
  nodeKey: PropTypes.string,
  title: PropTypes.string,
  fields: PropTypes.array,
  handles: PropTypes.array,
  defaultFieldsValue: PropTypes.object,
};