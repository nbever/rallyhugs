import { DataGridPro, GridToolbar } from '@mineral/datagrid';
import { Page } from 'layout/Page';
import { useCallback, useEffect, useState } from 'react';
import { useApi } from 'context/ApiContext';
import DetailPanel from 'components/DetailPanel';

export default function HugsPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const { getComments } = useApi();
  const getDetailPanelContent = useCallback(
    ({ row }) => <DetailPanel row={row} />,
    [],
  );

  useEffect(() => {
    getComments(filters).then((comments) => {
      comments.forEach((comment) => {
        comment.id = comment._id;
        comment.date = new Date(comment.date);
      });
      setData(comments);
    });
  }, [filters]);

  return (
    <Page title="Rally Hugs">
      <DataGridPro
        components={{
          Toolbar: GridToolbar,
        }}
        pagination
        autoPageSize
        rows={data}
        columns={columns}
        getDetailPanelContent={getDetailPanelContent}
      />
    </Page>
  );
}

const columns = [
  { field: 'customerName', headerName: 'Customer', width: 180 },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    width: 180,
  },
  { field: 'tags', headerName: 'Tags', width: 180 },
  { field: 'positive', headerName: 'Rating', type: 'number', width: 80 },
  { field: 'comment', headerName: 'Description', width: 600 },
  { field: 'userName', headerName: 'Submitted By', width: 180 },
];
