export const LeftTime = (deadline, createdAt) => {
	if(deadline && createdAt) {
		const date = new Date();
		const offsetInMinutes = date.getTimezoneOffset();

		const values = [3600 * 24, 3600, 60];
		const units = ["day", "hour", "min"];
		const time = values[0] * deadline + offsetInMinutes * 60 + Math.round(createdAt / 1000) - Math.round(Date.now() / 1000)

		if(time < 0) return 'Ended';

	    const addUnit = (value, unit) => {
	        return value.toString() + " " + (value === 1 ? unit : unit + "s");
	    }

		let res = "";
	    units.every((unit: string, index: number) => {
	        const count = Math.ceil(time / values[index]);
	        if (count >= 1) {
	            res += addUnit(count, unit);
	            return false;
	        }
	        return true;
	    })
	    res += ' left';
	    return res;
	} else return '';
}