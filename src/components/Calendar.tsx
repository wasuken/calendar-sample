import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const displayItemsNum = 2;

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ [key: string]: { name: string; description: string; date: string }[] }>({});
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const days = daysInMonth(currentMonth + 1, currentYear);

  const handleOpen = (date: string) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEventName('');
    setNewEventDescription('');
  };

  const handleAddEvent = () => {
    const newEvent = { name: newEventName, description: newEventDescription, date: selectedDate };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate]: [...(prevEvents[selectedDate] || []), newEvent],
    }));
    handleClose();
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  return (
    <div style={{fontSize: '0.6rem', minWidth: '500px' }}>
      <div style={{
	padding: '10px 100px',
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '16px' }}>
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
          <Grid item xs={1.6} px={0} key={day} >
            <Card
	      style={{ padding: '16px', minHeight: '120px' }}
	      onClick={() => handleOpen(`${day}`)}>
              <Typography variant="h6">{day}</Typography>
              {events[`${day}`] && events[`${day}`].slice(0, displayItemsNum).map((event, index) => (
                <Typography key={index} variant="body2">
                  {event.name}
                </Typography>
              ))}
              {events[`${day}`] && events[`${day}`].length > displayItemsNum && (
                <Typography variant="body2">+{events[`${day}`].length - displayItemsNum} more</Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Event for {selectedDate}</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleAddEvent} disabled={!newEventName.trim()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendar;
