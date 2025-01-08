import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ViewSwitcher from '../ViewSwitcher';
import { useCalenderContext } from '../../context/CalanderContext/useCalenderContext';
import { getViewModeMeta } from '../Helper';

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

const Header = () => {
	const { state, updateCalender } = useCalenderContext();
	const { currentDate, viewMode } = state;
	const { isMonthView, isWeekView } = getViewModeMeta(viewMode);
	const dayOffset = isWeekView ? 7 : 1;

	const handlePrevMonth = () => {
		if (isMonthView) {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() - dayOffset
				)
			);
		}
	};

	const handleNext = () => {
		if (isMonthView) {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() + dayOffset
				)
			);
		}
	};
	return (
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
			<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<h3>
					{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
				</h3>
			</div>
			<ViewSwitcher />
		</div>
	);
};

export default Header;
