import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
	CalenderContext,
	TCalenderContextKeys,
	TCalenderState,
} from './CalenderContext';
import { TMeetingData } from '../../components/CalendarWrap';

type TCalenderProviderProps = {
	children: ReactNode;
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

const CalenderProvider = (props: TCalenderProviderProps) => {
	const { children, meetingData } = props;

	const { dateMeetingMap, meetingIdMap } = useMemo(
		() => getMeetingMeta(meetingData),
		[meetingData]
	);
	const [calenderState, setCalendarContext] = useState<TCalenderState>({
		viewMode: 'week',
		pageOffset: 0,
		currentDate: new Date(),
		dateMeetingMap,
		meetingIdMap,
	});

	useEffect(() => {
		updateContext({ ...calenderState, dateMeetingMap, meetingIdMap });
	}, [meetingData]);

	const updateCalender = <T extends TCalenderContextKeys>(
		key: T,
		value: TCalenderState[T]
	) => {
		setCalendarContext({ ...calenderState, [key]: value });
	};

	const updateContext = (payload: Partial<TCalenderState>) => {
		setCalendarContext({ ...calenderState, ...payload });
	};

	return (
		<CalenderContext.Provider
			value={{ state: calenderState, updateCalender, updateContext }}
		>
			{children}
		</CalenderContext.Provider>
	);
};

export default CalenderProvider;
