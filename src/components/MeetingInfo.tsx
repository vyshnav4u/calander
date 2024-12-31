import { useState } from 'react';
import { TMeetingData } from '../App';
import dayjs from 'dayjs';

type TMeetingInfoProps = {
	meetingIdMap: Record<string, TMeetingData>;
	meetingIds: number[];
};

const MODAL_WIDTH = 240;

const OFFSET = 10;

const MeetingInfo = (props: TMeetingInfoProps) => {
	const { meetingIdMap, meetingIds } = props;
	const previewMeetingId = meetingIds[0];
	const meeting = meetingIdMap[previewMeetingId];
	const start = dayjs(meeting.start);
	const end = dayjs(meeting.end);
	const [showAllEvents, setShowAllEvents] = useState(false);

	const toggle = () => {
		setShowAllEvents(!showAllEvents);
	};

	const showCount = meetingIds.length > 1;
	return (
		<div
			style={{
				position: 'relative',
				display: 'grid',
				gridTemplateColumns: '20px 1fr',
				boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
				maxHeight: 60,
			}}
			onClick={toggle}
		>
			{showCount && (
				<div
					className="count"
					style={{
						background: '#fccb5c',
						color: '#333',
						borderRadius: '50%',
						position: 'absolute',
						top: -12,
						right: -12,
						display: 'grid',
						alignItems: 'center',
						justifyContent: 'center',
						width: 24,
						height: 24,
					}}
				>
					{meetingIds.length}
				</div>
			)}
			{showAllEvents && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="event-list"
					style={{
						position: 'absolute',
						right: -(MODAL_WIDTH + OFFSET),
						top: OFFSET,
						width: MODAL_WIDTH,
						background: '#fff',
					}}
				>
					{meetingIds.map((id) => {
						const event = meetingIdMap[previewMeetingId];
						const date = dayjs(event.start).format('DD MMM YYYY');
						const timeStart = dayjs(event.start).format('HH : mm');
						const timeEnd = dayjs(event.end).format('HH : mm');
						return (
							<div
								key={id}
								style={{
									boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
									display: 'grid',
									gridTemplateColumns: '10px 1fr',
									margin: '10px 0',
								}}
							>
								<div
									className="left-bar"
									style={{
										width: 10,
										background: '#0068bd',
									}}
								/>
								<div className="data" style={{ padding: 4 }}>
									<div>{event.desc}</div>
									<div>{event.summary}</div>
									<div>{`Date: ${date} | Time: ${timeStart} - ${timeEnd}`}</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
			<div
				className="left-bar"
				style={{
					width: 20,
					background: '#0068bd',
					height: '100%',
				}}
			/>
			<div className="data-wrap" style={{ fontSize: 12, padding: 4 }}>
				<div>{meeting.summary}</div>
				<div>{meeting.desc}</div>
				<div>{`Time: ${start.format('hh:mm')} - ${end.format('hh:mm')}`}</div>
			</div>
		</div>
	);
};

export default MeetingInfo;
