interface AudioParam {

	attribute float value;
	readonly attribute float minValue;
	readonly attribute float maxValue;
	readonly attribute float defaultValue;

	readonly attribute DOMString name;

	// Should define units constants here (seconds, decibels, cents, etc.)          

	readonly attribute short units;

	// Parameter automation. 
	void setValueAtTime(in float value, in float time);
	void linearRampToValueAtTime(in float value, in float time);
	void exponentialRampToValueAtTime(in float value, in float time);

	// Exponentially approach the target value with a rate having the given time constant. 
	void setTargetValueAtTime(in float targetValue, in float time, in float timeConstant);

	// Sets an array of arbitrary parameter values starting at time for the given duration. 
	// The number of values will be scaled to fit into the desired duration. 
	void setValueCurveAtTime(in Float32Array values, in float time, in float duration);

	// Cancels all scheduled parameter changes with times greater than or equal to startTime. 
	void cancelScheduledValues(in float startTime);

}