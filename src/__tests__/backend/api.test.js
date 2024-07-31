import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormItemSelect from './FormItemSelect'; // Importez le composant que vous testez
import { Form, Select } from 'antd';
const { Option } = Select;
const mockHandlePeriodChange = jest.fn();
const mockSetPeriodesSelected = jest.fn();
const mockPeriodes = [
  { id: '1', title: 'Periode 1' },
  { id: '2', title: 'Periode 2' },
];
test('affiche les options de période et gère la sélection', () => {
  render(
    <Form>
      <Form.Item label="Période">
        <Select
          mode="multiple"
          value={[]}
          style={{ width: '100%' }}
          onChange={mockHandlePeriodChange}
          onDeselect={() => mockSetPeriodesSelected(false)}
        >
          {mockPeriodes.map(periode => (
            <Option key={periode.id} value={periode.title}>
              {periode.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
  // Vérifier que les options sont affichées
  expect(screen.getByText('Periode 1')).toBeInTheDocument();
  expect(screen.getByText('Periode 2')).toBeInTheDocument();
  // Simuler une sélection
  fireEvent.change(screen.getByRole('combobox'), { target: { value: ['Periode 1'] } }); 
  // Vérifier que la fonction de changement a été appelée avec les bonnes valeurs
  expect(mockHandlePeriodChange).toHaveBeenCalledWith(['Periode 1']);
});




