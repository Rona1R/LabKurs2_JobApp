import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import Loading from "src/components/common/Loading";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { InterviewService } from "src/api/sevices/InterviewService";
import { useAuth } from "src/context/AuthContext";
import CreateInterview from "./CreateInterview";
import "./style/Calendar.css";
import { useNotification } from "src/hooks/useNotification";
import UpdateInterview from "./UpdateInterview";
const interviewService = new InterviewService();

export default function Interviews() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [selectedDate, setSelectedDate] = useState("");
  const [showCreateInterview, setShowCreateInterview] = useState(false);
  const [showUpdateInterview, setShowUpdateInterview] = useState(false);
  const [selectedIInterview, setSelectedInterview] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await interviewService.getByEmployer(userId);
        const formattedResponse = response.data.map((interview) => ({
          id: interview.id,
          title: `(${interview.interviewMode}) - ${interview.status}`,
          start: interview.scheduledAt + "Z",
          end: interview.endsAt + "Z",
          className: [
            `interview-event status-${interview.status.toLowerCase()}`,
          ],
        }));
        setInterviews(formattedResponse);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.dateStr);
    const now = new Date();

    if (clickedDate < now) {
      showNotification("error", "You cannot schedule a meeting in the past.");
    } else {
      setSelectedDate(clickedDate);
      setShowCreateInterview(true);
    }
  };

  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedInterview(event.id);
    setShowUpdateInterview(true);
  };

  return (
    <>
      {showCreateInterview && (
        <CreateInterview
          userId={userId}
          selectedDate={selectedDate}
          handleClose={() => setShowCreateInterview(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showUpdateInterview && selectedIInterview && (
        <UpdateInterview
          interviewId={selectedIInterview}
          handleClose={() => setShowUpdateInterview(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      <Box sx={{ mx: 4 }}>
        {loading ? (
          <Loading />
        ) : (
          <FullCalendar
            allDaySlot={false}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={interviews}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        )}
      </Box>
    </>
  );
}
