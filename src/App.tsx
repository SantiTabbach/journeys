import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';

function AppContent() {
	useLenis();

	return (
		<PageTransition>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/journey/:id" element={<JourneyPage />} />
			</Routes>
		</PageTransition>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}
