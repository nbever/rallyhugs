import {useState, MouseEvent} from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mineral/core'

import {UserType, useUser} from './context/UserContext';

const UserDialog = () => {

  const {setUser, user} = useUser();
  const [userText, setUserText] = useState<String>('');

  const handleInput = ($e: MouseEvent) => {
    if (!userText || userText === '') {
      return;
    }

    setUser({name: userText, color: '', icon: ''});
  };

  return (
    <Dialog open={!user}>
      <DialogTitle>Specify User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Who Are You?"
          type="text"
          fullWidth
          value={userText}
          onChange={($e) => setUserText($e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInput} disabled={!userText || userText === ''}>Continue</Button>
      </DialogActions>
    </Dialog>
  );  
};

export default UserDialog;