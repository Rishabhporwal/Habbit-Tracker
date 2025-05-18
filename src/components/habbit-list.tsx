import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import CheckCircleOutline from '@mui/icons-material/CheckBoxOutlined'
import { DeleteOutline } from '@mui/icons-material'
import { removeHabits, toggleHabit, type Habit } from '../store/habbit-slice'


const HabbitList: React.FC = () => {

    const { habits } = useSelector((state: RootState) => state.habits)
    const dispatch = useDispatch<AppDispatch>();
    const today = new Date().toISOString().split("T")[0]

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date()
        while (true) {
            const dateString = currentDate.toISOString().split("T")[0]
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1)
            } else {
                break;
            }
        }
        return streak;
    }

    return <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 4 }}>
        {habits.map((habit) => {
            return <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
                <Grid container alignItems="center">
                    <Grid>
                        <Typography variant='h6'>{habit.name}</Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ textTransform: "capitalize" }}>{habit.frequency}</Typography>
                    </Grid>
                    <Grid>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            <Button
                                variant='outlined'
                                color={habit.completedDates.includes(today) ? 'success' : 'error'}
                                startIcon={<CheckCircleOutline />}
                                onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
                            >
                                {habit.completedDates.includes(today) ? 'Completed' : 'Mark Completed'}
                            </Button>
                            <Button
                                variant='outlined'
                                color='error'
                                startIcon={<DeleteOutline />}
                                onClick={() => { dispatch(removeHabits({ id: habit.id })) }}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Typography variant='body2'>
                        Current Steak: {getStreak(habit)} days
                    </Typography>
                </Box>
                <LinearProgress variant='determinate' value={(getStreak(habit) / 30) * 100} sx={{ mt: 1 }} />
            </Paper>
        })}
    </Box >
}

export default HabbitList