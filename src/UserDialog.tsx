import {useState, useEffect, MouseEvent} from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mineral/core'

import {UserType, useUser} from './context/UserContext';
import {useApi} from './context/ApiContext';

const UserDialog = () => {

  const {setUser, user} = useUser();
  const [userText, setUserText] = useState<String>('');
  const {getUsers} = useApi();

  const refreshUsers = async (): Promise<any> => {
    const users = await getUsers();
    console.log(JSON.stringify(users));
  };

  useEffect(() => {
    refreshUsers();
  }, []);

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