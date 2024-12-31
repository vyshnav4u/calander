import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import meetingDataJson from './data/calanderFromToEndDate.json';

export type TMeetingData = {
	id: number;
	summary: string;
	desc: string;
	start: string;
	end: string;
	attendees: any;
	status: any;
	comment: string;
	score: {
		P: number;
	};
	link: string;
	user_det?: Record<string, any>;
	job_id?: Record<string, any>;
};

const App = () => {
	const [meetingData, setMeetingData] = useState<TMeetingData[]>([]);
	useEffect(() => {
		// const fetchMeeting = async () => {
		// 	try {
		// 		const res = await fetch('/data/calanderFromToEndDate.json');
		// 		if (!res.ok) throw new Error("Can't read json");
		// 		const data = await res.json();
		// 		console.log('data', data);
		// 		setMeetingData(data);
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// };
		// fetchMeeting();
		setMeetingData(meetingDataJson as TMeetingData[]);
	}, []);

	console.log('meetingData', meetingData);

	return (
		<div>
			<Calendar meetingData={meetingData} />
		</div>
	);
};

export default App;
