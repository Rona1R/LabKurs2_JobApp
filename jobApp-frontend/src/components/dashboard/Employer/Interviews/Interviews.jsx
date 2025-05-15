import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box } from '@mui/material';

export function Interviews() {
  return (
    <Box sx={{mx:4}}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Meeting', start: '2024-05-15T10:30:00', end: '2024-05-15T12:00:00' },
          { title: 'Lunch', start: '2024-05-16T12:00:00', color: 'green' }
        ]}
      />
    </Box>
  );
}