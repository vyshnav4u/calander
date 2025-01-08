import { CSSProperties } from 'react';
import { useCalenderContext } from '../../context/CalanderContext/useCalenderContext';
import { firstDayOfMonth, getDaysInMonth } from '../Helper';
import { DEFAULT_COLORS } from '../Calendar';

const MonthView = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { state } = useCalenderContext();
	const { currentDate } = state;
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const totalDays = getDaysInMonth(month, year);
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

export default MonthView;
