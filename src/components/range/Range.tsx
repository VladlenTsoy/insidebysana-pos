import React from "react"
import Slider, {SliderProps} from "rc-slider"
import "rc-slider/assets/index.css"

interface RangeProps {
    onChange?: SliderProps["onChange"]
    onBeforeChange?: SliderProps["onBeforeChange"]
    onAfterChange?: SliderProps["onAfterChange"]
    value?: SliderProps["defaultValue"]
    marks?: SliderProps["marks"]
    max: SliderProps["max"]
    min: SliderProps["min"]
}

const Range: React.FC<RangeProps> = ({onChange, onBeforeChange, onAfterChange, value, marks, min, max}) => {
    return (
        <Slider
            range
            onChange={onChange}
            onAfterChange={onAfterChange}
            onBeforeChange={onBeforeChange}
            min={min}
            max={max}
            value={value}
            marks={marks}
        />
    )
}

export default Range
