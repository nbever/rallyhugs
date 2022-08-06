import {
  Stack,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Box,
  IconButton,
  CardContent,
} from '@mineral/core';
import { EllipsisVertical } from '@mineral/icons';
import * as dayjs from 'dayjs';

export default function DetailPanelContent({ row: rowProp }) {
  return (
    <Stack
      sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
      direction="column">
      <Card sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ color: 'common.white', bgcolor: 'secondary.dark' }}
              size="medium">
              {rowProp.customerName.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <EllipsisVertical />
            </IconButton>
          }
          title={rowProp.customerName}
          subheader={dayjs(rowProp.date).format('LL')}
        />
        <CardContent>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Tags
              </Typography>
              <Typography variant="body1">
                {rowProp.tags?.join(', ')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Rating
              </Typography>
              <Typography variant="body1">{rowProp.positive}</Typography>
            </Box>
            <Box sx={{ width: '80ch' }}>
              <Typography variant="body2" color="textSecondary">
                Description
              </Typography>
              <Typography variant="body1">{rowProp.comment}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Submitted By
              </Typography>
              <Typography variant="body1">{rowProp.userName}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
