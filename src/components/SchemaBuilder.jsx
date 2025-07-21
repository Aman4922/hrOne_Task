import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import Field from './Field';

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const updateField = (index, updatedField) => {
    const updated = [...fields];
    updated[index] = updatedField;
    setFields(updated);
  };

  const getSchema = (fields) => {
    return fields.reduce((acc, field) => {
      if (!field.name) return acc;
      let value;
      switch (field.type) {
        case 'string': value = 'STRING'; break;
        case 'number': value = 'number'; break;
        case 'objectId': value = 'objectId'; break;
        case 'float': value = 0.0; break;
        case 'boolean': value = true; break;
        case 'array': value = []; break;
        case 'nested': value = getSchema(field.children || []); break;
        default: value = null;
      }
      acc[field.name] = value;
      return acc;
    }, {});
  };

  return (
    <Row style={{ minHeight: '90vh', width: '100vw', margin: 0 }} gutter={16}>
      <Col span={12} style={{ padding: '20px' }}>
        {fields.map((field, idx) => (
          <Field
            key={field.id}
            field={field}
            onChange={(updatedField) => updateField(idx, updatedField)}
            onDelete={() => setFields(fields.filter((_, i) => i !== idx))}
          />
        ))}
        <Button
          type="primary"
          block
          onClick={() =>
            setFields([
              ...fields,
              { id: Date.now(), name: '', type: 'string', required: false }
            ])
          }
        >
          + Add Item
        </Button>
      </Col>

      <Col span={12} style={{ padding: '20px' }}>
        <Card title="Live JSON Preview" style={{ height: '100%' }}>
          <pre>{JSON.stringify(getSchema(fields), null, 2)}</pre>
        </Card>
      </Col>
    </Row>
  );
};

export default SchemaBuilder;
