import { useCalenderContext } from '../context/useCalenderContext';
import { getViewModeMeta } from './Helper';
import { FIRST_COLUMN_WIDTH } from './Calendar';
import TimeColumn from './TimeColumn';
import CalenderBody from './CalenderBody';

const BodyWrapper = () => {
	const { state } = useCalenderContext();
	const { viewMode } = state;

	const { isMonthView } = getViewModeMeta(viewMode);
	return (
		<div
			className="body-wrap"
			style={{
				display: 'grid',
				gridTemplateColumns: isMonthView
					? '1fr'
					: `${FIRST_COLUMN_WIDTH}px 1fr`,
				maxHeight: 500,
				overflowY: 'scroll',
				scrollbarWidth: 'none',
			}}
		>
			<TimeColumn />
			<CalenderBody />
		</div>
	);
};

export default BodyWrapper;
