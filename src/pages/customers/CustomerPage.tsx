import * as React from 'react';
import { DataGridPro } from '@mineral/datagrid';
import {
  randomCreatedDate,
  randomCompanyName,
} from '@mui/x-data-grid-generator';
import { Page } from 'layout/Page';

export default function BasicEditingGrid() {
  return (
    <Page title="Customers">
      <DataGridPro
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Page>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
  },
];

const rows = [
  {
    id: 1,
    name: randomCompanyName(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 2,
    name: randomCompanyName(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 3,
    name: randomCompanyName(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 4,
    name: randomCompanyName(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 5,
    name: randomCompanyName(),
    dateCreated: randomCreatedDate(),
  },
];
