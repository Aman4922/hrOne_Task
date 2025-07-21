import React from 'react';
import { Input, Select, Button, Card, Collapse, Switch } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;

const Field = ({ field, onChange, onDelete }) => {
  const handleChildChange = (index, updatedChild) => {
    const updatedChildren = [...(field.children || [])];
    updatedChildren[index] = updatedChild;
    onChange({ ...field, children: updatedChildren });
  };

  return (
    <Card style={{ marginBottom: '15px' }}>
      <Input
        placeholder="Field Name"
        value={field.name}
        onChange={(e) => onChange({ ...field, name: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      
      <Select
        value={field.type}
        style={{ width: '100%', marginBottom: '10px' }}
        onChange={(type) => {
          if (type === 'nested') onChange({ ...field, type, children: [] });
          else onChange({ ...field, type, children: undefined });
        }}
      >
        <Option value="string">string</Option>
        <Option value="number">number</Option>
        <Option value="objectId">objectId</Option>
        <Option value="float">float</Option>
        <Option value="boolean">boolean</Option>
        <Option value="array">array</Option>
        <Option value="nested">nested</Option>
      </Select>

      <div style={{ marginBottom: '10px' }}>
        <Switch
          checked={field.required}
          onChange={(checked) => onChange({ ...field, required: checked })}
        /> Required
      </div>

      {field.type === 'nested' && (
        <Collapse>
          <Panel header="Nested Fields">
            {(field.children || []).map((child, idx) => (
              <Field
                key={child.id}
                field={child}
                onChange={(updatedChild) => handleChildChange(idx, updatedChild)}
                onDelete={() =>
                  onChange({
                    ...field,
                    children: field.children.filter((_, i) => i !== idx)
                  })
                }
              />
            ))}
            <Button
              onClick={() =>
                onChange({
                  ...field,
                  children: [
                    ...(field.children || []),
                    { id: Date.now(), name: '', type: 'string', required: false }
                  ]
                })
              }
              type="primary"
              block
            >
              + Add Nested Field
            </Button>
          </Panel>
        </Collapse>
      )}

      <Button danger onClick={onDelete} block>Delete Field</Button>
    </Card>
  );
};

export default Field;
