import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import SubjectsPage from './pages/SubjectsPage'
import EventsPage from './pages/EventsPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import LogsPage from './pages/LogsPage'
import SettingsPage from './pages/SettingsPage'
import RequirementsOverview from './pages/RequirementsOverview'
import MessageRegisterPage from './pages/MessageRegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="requirements" element={<RequirementsOverview />} />
        <Route path="message/register" element={<MessageRegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
