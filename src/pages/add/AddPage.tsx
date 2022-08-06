import * as React from 'react';
import {
  Stack,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
} from '@mineral/core';
import { DatePicker } from '@mineral/date-pickers';
import { useApi } from 'context/ApiContext';
import { useUser } from 'context/UserContext';
import { Page } from 'layout/Page';

const defaultFormValues = {
  customer: '',
  date: new Date(),
  tags: [],
  positive: 11,
  comment: '',
};
const AddPage: React.FC = () => {
  const [alertState, setAlertState] = React.useState<{
    open: boolean;
    severity: AlertColor;
  }>({ open: false, severity: 'success' });

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState({ ...alertState, open: false });
  };

  const [formValues, setFormValues] = React.useState<{
    date: Date;
    customer: String;
    tags: String[];
    positive: number;
    comment: String;
  }>(defaultFormValues);
  const api = useApi();
  const { user } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submit = () => {
    api.addComment({ ...formValues, user: user.name }).then(() => {
      setAlertState({ ...alertState, open: true });
    });
  };

  return (
    <Page title="Add Hugs">
      <Stack direction="column" spacing={2} sx={{ width: '60ch' }}>
        <Box>
          <TextField
            label="Customer"
            name="customer"
            value={formValues.customer}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box>
          <DatePicker
            label="Date"
            value={formValues.date}
            onChange={(value) => {
              setFormValues({ ...formValues, date: value });
            }}
            renderInput={(params) => (
              <TextField name="date" {...params} fullWidth />
            )}
          />
        </Box>
        <Box>
          <TextField
            label="Positivity Factor"
            name="positive"
            value={formValues.positive}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            label="Tags"
            name="tags"
            value={formValues.tags}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            label="Description"
            name="comment"
            value={formValues.comment}
            onChange={handleInputChange}
            multiline
            rows="5"
            fullWidth
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </Box>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertState.open}
        autoHideDuration={6000}
        onClose={closeAlert}>
        <Alert
          onClose={closeAlert}
          severity={alertState.severity}
          sx={{ width: '100%' }}>
          Hug successfully delivered!
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default AddPage;
