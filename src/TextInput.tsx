import React, { useState, useEffect, ChangeEvent } from "react";

function format(text: string | null) {
    return text != null ? text : "";
}

function unformat(text: string | null) {
    return text?.trim().length === 0 ? null : text;
}

interface TextInputProps {
    type?: string;
    name: string;
    id: string;
    key: string;
    placeholder: string;
    tag?: string;
    rows?: string;
    columns?: string;
    UpperChange(e: MouseEvent, value: null | string | email): void;
    value: string | null | email;
    clear: boolean;
}

export default function TextInput(props: TextInputProps): React.ReactElement {

    const [value, setValue] = useState(format(props.value));
    const { UpperChange } = props;

    useEffect(() => {
        setValue("");
    }, [props.clear]);

    function onBlur(e: MouseEvent) {
        UpperChange(e, unformat(value));
    }

    function onChange(e: ChangeEvent) {
        e.target.value !== null ? setValue(e.target.value) : setValue("");
    }

    const { tag = "input" } = props;

    return React.createElement(tag, {
        ...props,
        value,
        onBlur,
        onChange,
    });
}
