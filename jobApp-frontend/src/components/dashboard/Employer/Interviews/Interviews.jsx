import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import "./style/Calendar.css";

export function Interviews() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <Box sx={{ mx: 4 }}>
      <FullCalendar
        allDaySlot={false}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        eventClassNames={(arg) => {
          return ['interview-event'];
        }}
        events={[
          {
            title: "Interview 1",
            start: "2025-05-15T10:00:00",
            end: "2025-05-15T10:30:00",
          },
          {
            title: "Interview 2",
            start: "2025-05-15T13:30:00",
            end: "2025-05-15T14:30:00",
          },
        ]}
        dateClick={handleDateClick}
      />
    </Box>
  );
}
