import React, { CSSProperties, useMemo, useState } from 'react';
import './Calendar.css';
import dayjs from 'dayjs';
import { TMeetingData } from '../App';
import MeetingInfo from './MeetingInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const DEFAULT_COLORS = {
	primaryFontColor: '#333',
	fontColor: '#0069be',
	borderColor: '#e6e6e6',
	bgColor: '#fafafa',
};

const DATE_COLUMNS_COUNT = 7;
const CELL_HEIGHT = 70;
const CELL_WIDTH = 90;

const FIRST_COLUMN_WIDTH = 60;

const daysInMonth = (month: number, year: number) =>
	new Date(year, month + 1, 0).getDate();

const firstDayOfMonth = (month: number, year: number) =>
	new Date(year, month, 1).getDay();

const generateDates = (startDate: Date, length: number) => {
	const datesArray: Date[] = [];
	const start = new Date(startDate);

	for (let i = 0; i < length; i++) {
		const currentDate = new Date(start);
		currentDate.setDate(start.getDate() + i);
		datesArray.push(currentDate);
	}

	return datesArray;
};

const isTimeInInterval = (
	givenTime: string,
	startTime: string,
	endTime: string
) => {
	const given = new Date(givenTime).getTime(); // Convert given time to timestamp
	const start = new Date(startTime).getTime(); // Convert start time to timestamp
	const end = new Date(endTime).getTime(); // Convert end time to timestamp

	// Check if given time is between start and end
	return given >= start && given <= end;
};

const setMinuteToZero = (time: Date) => {
	const newTime = new Date(time);
	newTime.setMinutes(0, 0, 0);
	return newTime;
};

const generateNextHours = (date: Date, limit = 24) => {
	const currentDate = new Date(date);
	currentDate.setHours(0, 0, 0, 0);
	const timesArray: Date[] = [];
	for (let i = 0; i < limit; i++) {
		const newTime = new Date(currentDate);
		newTime.setHours(currentDate.getHours() + i);
		timesArray.push(newTime);
	}
	return timesArray;
};

const getNextHour = (currentDate: Date) => {
	const newTime = new Date(currentDate);
	newTime.setHours(currentDate.getHours() + 1);
	return newTime;
};

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

type TEViewMode = 'day' | 'month';

type TCalenderProps = {
	meetingData: TMeetingData[];
};

const getMeetingMeta = (meetingData: TMeetingData[]) => {
	const meetingIdMap: Record<string, TMeetingData> = {};
	const dateMeetingMap: Record<string, number[]> = {};
	meetingData.forEach((data) => {
		meetingIdMap[data.id] = data;
		const startDateTime = new Date(data.start).getTime();
		if (dateMeetingMap[startDateTime]) {
			dateMeetingMap[startDateTime].push(data.id);
		} else {
			dateMeetingMap[startDateTime] = [data.id];
		}
	});
	return { meetingIdMap, dateMeetingMap };
};

const Calendar = (props: TCalenderProps) => {
	const { meetingData } = props;
	const [currentDate, setCurrentDate] = useState(new Date());
	const [viewMode, setViewMode] = useState<TEViewMode>('day');
	const { dateMeetingMap, meetingIdMap } = useMemo(
		() => getMeetingMeta(meetingData),
		[meetingData]
	);

	const handlePrevMonth = () => {
		if (viewMode === 'day') {
			setCurrentDate(
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() - 7
				)
			);
		} else {
			setCurrentDate(
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
			);
		}
	};

	const handleNext = () => {
		if (viewMode === 'day') {
			setCurrentDate(
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() + 7
				)
			);
		} else {
			setCurrentDate(
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
			);
		}
	};

	const renderCalendar = () => {
		if (viewMode == 'day') {
			const comingDays = generateDates(currentDate, DATE_COLUMNS_COUNT);
			return comingDays.map((day) => {
				const nextHours = generateNextHours(day, 24);
				return (
					<div key={day.getTime()}>
						{nextHours.map((hour) => {
							const formattedHour = setMinuteToZero(hour);
							const timeStamp = formattedHour.getTime();
							const meetingIds = dateMeetingMap[timeStamp];

							return (
								<div
									key={hour.getTime()}
									style={{
										border: `1px solid ${DEFAULT_COLORS.borderColor}`,
										height: CELL_HEIGHT,
										width: CELL_WIDTH,
									}}
									data-date={`${hour}`}
								>
									{meetingIds?.length && (
										<MeetingInfo
											meetingIds={meetingIds}
											meetingIdMap={meetingIdMap}
										/>
									)}
								</div>
							);
						})}
					</div>
				);
			});
		}
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const totalDays = daysInMonth(month, year);
		const startDay = firstDayOfMonth(month, year);

		const cellStyle: CSSProperties = {
			border: `1px solid ${DEFAULT_COLORS.borderColor}`,
			textAlign: 'center',
			minHeight: 60,
			fontWeight: 'bold',
			padding: 4,
		};
		const calendarDays: JSX.Element[] = [];
		for (let i = 0; i < startDay; i++) {
			calendarDays.push(
				<div key={`empty-${i}`} className="empty" style={cellStyle} />
			);
		}

		for (let day = 1; day <= totalDays; day++) {
			calendarDays.push(
				<div key={day} className="day" style={cellStyle}>
					{day}
				</div>
			);
		}

		return calendarDays;
	};

	const renderHead = () => {
		if (viewMode === 'day') {
			const comingDays = generateDates(currentDate, DATE_COLUMNS_COUNT);

			return (
				<div
					className="days"
					style={{
						display: 'flex',
					}}
				>
					<div
						className="blank"
						style={{
							width: FIRST_COLUMN_WIDTH,
							border: `1px solid ${DEFAULT_COLORS.borderColor}`,
						}}
					/>
					<div
						className="cell"
						style={{
							display: 'grid',
							gridTemplateColumns: `repeat(${DATE_COLUMNS_COUNT}, 1fr)`,
						}}
					>
						{comingDays.map((day) => {
							const formattedDate = dayjs(day);
							const currentDay = formattedDate.format('DD');
							const currentMonth = formattedDate.format('MMM');
							const currentDayInWord = formattedDate.format('dddd');
							return (
								<div
									key={currentDay}
									className="day-name"
									style={{
										display: 'grid',
										alignItems: 'center',
										color: DEFAULT_COLORS.primaryFontColor,
										textAlign: 'center',
										padding: 4,
										width: CELL_WIDTH,
										height: CELL_HEIGHT,
										border: `1px solid ${DEFAULT_COLORS.borderColor}`,
									}}
								>
									<p>{`${currentDay} ${currentMonth}`}</p>
									<p>{currentDayInWord}</p>
								</div>
							);
						})}
					</div>
				</div>
			);
		}
		return (
			<div className="days">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
					<div
						key={day}
						className="day-name"
						style={{
							color: DEFAULT_COLORS.fontColor,
							textAlign: 'center',
							padding: 4,
						}}
					>
						{day}
					</div>
				))}
			</div>
		);
	};

	const SidePanel = () => {
		if (viewMode !== 'day') return null;

		const nextHours = generateNextHours(currentDate, 24);
		return (
			<div className="side-panel" style={{ width: FIRST_COLUMN_WIDTH }}>
				{nextHours.map((hour) => {
					const currHour = dayjs(hour);
					const time = currHour.format('hh');
					const clock = currHour.format('a');

					return (
						<div
							key={time + clock}
							className="side-panel-item"
							style={{
								width: FIRST_COLUMN_WIDTH,
								color: DEFAULT_COLORS.fontColor,
								border: `1px solid ${DEFAULT_COLORS.borderColor}`,
								height: CELL_HEIGHT,
								display: 'grid',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<p style={{ margin: 'auto' }}>
								{time} {clock}
							</p>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="calendar" style={{ background: DEFAULT_COLORS.bgColor }}>
			<div className="header">
				<div
					style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}
				>
					<button onClick={handlePrevMonth}>
						<FontAwesomeIcon icon={faChevronLeft} size="1x" />
					</button>

					<button onClick={handleNext}>
						<FontAwesomeIcon icon={faChevronRight} size="1x" />
					</button>
				</div>
				<div
					style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
				>
					<h3>
						{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
					</h3>
				</div>
			</div>
			<div className="calendar-body" style={{ display: 'flex', gap: 10 }}>
				<div>
					{renderHead()}
					<div
						className="body-wrap"
						style={{ display: 'flex', maxHeight: 500, overflowY: 'scroll' }}
					>
						<SidePanel />
						<div
							className="dates"
							style={{
								display: 'grid',
								gridTemplateColumns: `repeat(${DATE_COLUMNS_COUNT}, 1fr)`,
								width: '100%',
							}}
						>
							{renderCalendar()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
