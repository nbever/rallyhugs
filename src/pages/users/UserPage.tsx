import { useEffect, useState } from 'react';
import { DataGridPro } from '@mineral/datagrid';
import { Page } from 'layout/Page';
import { useApi } from 'context/ApiContext';

export default function UserPage() {
  const [data, setData] = useState(null);
  const { getUsers } = useApi();

  useEffect(() => {
    getUsers().then((users) => {
      users.forEach((user) => (user.id = user._id));
      setData(users);
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Page title="Users">
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
