import { DataGridPro } from '@mineral/datagrid';
import * as React from 'react';
import { Page } from 'layout/Page';
import { useEffect, useState } from 'react';
import { useApi } from 'context/ApiContext';

export default function TagPage() {
  const [data, setData] = useState([]);
  const { getTags } = useApi();

  useEffect(() => {
    getTags().then((tags) => {
      tags.forEach((tag) => (tag.id = tag._id));
      setData(tags);
    });
  }, []);

  return (
    <Page title="Tags">
      <DataGridPro
        rows={data}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Page>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 600, editable: true },
];
