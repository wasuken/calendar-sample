import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Slide,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const displayItemsNum = 2;

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

interface CalendarEvent {
  begin: Date;
  end: Date;
  title: string;
  description: string;
  // users: User[];
}

interface MonthlyCalendarProps {
  yearMonth: string;
  // データ管理は基本上位コンポーネントがおこなう
  eventItems: CalendarEvent[];
  // YYYY-MMの左右のボタンとかでつかう
  onYearMonthNext: () => void;
  onYearMonthPrev: () => void;
  // itemsの更新につかう
  onEventsUpdate: (events: CalenderEvent[]) => void;
}

const MonthlyCalendar: React.FC = ({
  eventItems,
  yearMonth,
  onYearMonthNext,
  onYearMonthPrev,
  onEventsUpdate,
}: MonthlyCalendarProps) => {
  const [newEventBegin, setNewEventBegin] = useState<string>();
  const [newEventEnd, setNewEventEnd] = useState<string>();
  const [newEventName, setNewEventName] = useState<string>();
  const [newEventDescription, setNewEventDescription] = useState<string>();
  const days = daysInMonth(currentMonth + 1, currentYear);

  const handleOpen = (date: string) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEventName("");
    setNewEventDescription("");
  };

  const handleAddEvent = () => {
    const newEvent = {
      name: newEventName,
      description: newEventDescription,
      begin: newEventBegin,
      end: newEventEnd,
    };
    onEventsUpdate([...eventItems, newEvent]);
    handleClose();
  };

  return (
    <div style={{ fontSize: "0.6rem", minWidth: "500px" }}>
      <div
        style={{
          padding: "10px 100px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {`${currentYear}-${currentMonth + 1}`}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <Grid container spacing={0}>
        {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
          <Grid item xs={1.6} px={0} key={day}>
            <Card
              style={{ padding: "16px", minHeight: "120px" }}
              onClick={() => handleOpen(`${day}`)}
            >
              <Typography variant="h6">{day}</Typography>
              {events[`${day}`] &&
                events[`${day}`]
                  .slice(0, displayItemsNum)
                  .map((event, index) => (
                    <Typography key={index} variant="body2">
                      {event.name}
                    </Typography>
                  ))}
              {events[`${day}`] &&
                events[`${day}`].length > displayItemsNum && (
                  <Typography variant="body2">
                    +{events[`${day}`].length - displayItemsNum} more
                  </Typography>
                )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event for {selectedDate}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Begin"
            type="datetime-local"
            fullWidth
            value={newEventBegin}
            onChange={(e) => setNewEventBegin(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="End"
            type="datetime-local"
            fullWidth
            value={newEventEnd}
            onChange={(e) => setNewEventEnd(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Event Description"
            type="text"
            fullWidth
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent} disabled={!newEventName.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MonthlyCalendar;
