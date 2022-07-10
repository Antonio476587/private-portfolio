import React, { useState, useEffect } from "react";

function format(text) {
    return text != null ? text : "";
}

function unformat(text) {
    return text.trim().length === 0 ? null : text;
}

export default function TextInput(props) {

    const [value, setValue] = useState(format(props.value));

    useEffect(() => {
        setValue("");
    }, [props.Clear]);

    function onBlur(e) {
        const { UpperChange } = props;
        UpperChange(e, unformat(value));
    }

    function onChange(e) {
        setValue(e.target.value);
    }

    const { tag = "input" } = props;

    return React.createElement(tag, {
        ...props,
        value,
        onBlur,
        onChange,
    });
}
