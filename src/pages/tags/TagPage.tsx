import * as React from 'react';
import { DataGridPro } from '@mineral/datagrid';
import {
  randomCreatedDate,
  randomUserName,
  randomColor,
} from '@mui/x-data-grid-generator';
import { Page } from 'layout/Page';

export default function BasicEditingGrid() {
  return (
    <Page title="Tags">
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
  { field: 'color', headerName: 'Color' },
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
    name: randomUserName(),
    color: randomColor(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 2,
    name: randomUserName(),
    color: randomColor(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 3,
    name: randomUserName(),
    color: randomColor(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 4,
    name: randomUserName(),
    color: randomColor(),
    dateCreated: randomCreatedDate(),
  },
  {
    id: 5,
    name: randomUserName(),
    color: randomColor(),
    dateCreated: randomCreatedDate(),
  },
];
