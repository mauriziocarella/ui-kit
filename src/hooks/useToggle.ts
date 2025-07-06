import {useCallback, useState} from 'react';

const useToggle = (initialState: boolean = false) => {
	const [value, setValue] = useState(initialState);

	const toggle = useCallback(() => setValue((prev) => !prev), []);

	return [value, toggle, setValue] as const;
};

export default useToggle;
