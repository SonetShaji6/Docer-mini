import React, { useEffect, useState } from 'react';

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('http://localhost:5000/api/hello')
			.then(res => res.json())
			.then(data => setMessage(data.message))
			.catch(err => {
				console.error('Fetch error:', err);
				setMessage('Unable to reach backend');
			});
	}, []);

	return (
		<div style={{ textAlign: 'center', marginTop: '3rem' }}>
			<h1>Frontend + Backend + DB with Docker 🐳</h1>
			<p>
				Message from backend: <b>{message}</b>
			</p>
		</div>
	);
}

export default App;