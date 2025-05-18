import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import { Container, Typography } from '@mui/material'
import AddHabitForm from './components/add-habit-form'
import HabbitList from './components/habbit-list'
import HabitStats from './components/habit-stats'

function App() {

  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant='h2' align='center'>Habbit Tracker</Typography>
        <AddHabitForm />
        <HabbitList />
        <HabitStats />
      </Container>
    </Provider>
  )

}

export default App
