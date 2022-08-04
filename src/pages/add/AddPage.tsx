import * as React from 'react';
import { Box, Button, TextField } from '@mineral/core';
import { Page } from 'layout/Page';
import { DatePicker } from '@mineral/date-pickers';
import { useApi } from '../../context/ApiContext';
import { useUser } from '../../context/UserContext';

const defaultFormValues = {
  customer: '',
  date: new Date(),
  tags: [],
  positive: 11,
  comment: '',
};
const AddPage: React.FC = () => {
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
      const jsonString = JSON.stringify({ ...formValues, user: user.name });
      console.log(jsonString);
    api.addComment(jsonString).then((res) => {
        console.log('response', res);
    });
  };

  return (
    <Page title="Add Feedback">
      <Box sx={{ width: '60ch' }}>
        <Box>
          <TextField
            label="Customer"
            name="customer"
            value={formValues.customer}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
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
              <TextField name="date" {...params} fullWidth margin="normal" />
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
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            label="Tags"
            name="tags"
            value={formValues.tags}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
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
            margin="normal"
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default AddPage;
