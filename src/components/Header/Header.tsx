import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ViewSwitcher from '../ViewSwitcher';
import { useCalenderContext } from '../../context/useCalenderContext';

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

	const handlePrevMonth = () => {
		if (viewMode === 'day') {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() - 7
				)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
			);
		}
	};

	const handleNext = () => {
		if (viewMode === 'day') {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() + 7
				)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
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
