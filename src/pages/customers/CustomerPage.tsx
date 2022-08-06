import { useEffect, useState } from 'react';
import { DataGridPro } from '@mineral/datagrid';
import { Page } from 'layout/Page';
import { useApi } from 'context/ApiContext';

export default function CustomerPage() {
  const [data, setData] = useState(null);
  const { getCustomers } = useApi();

  useEffect(() => {
    getCustomers().then((customers) => {
      customers.forEach((customer) => (customer.id = customer._id));
      setData(customers);
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Page title="Customers">
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
