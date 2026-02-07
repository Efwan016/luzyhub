import { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TextInput = forwardRef(function TextInput(
    {
        type = "text",
        name = "",
        value = "",
        className = "",
        autoComplete = "",
        required = false,
        handleChange,
        onChange,
        variant = "primary",
        isFocused = false,
        placeholder = "",
        isError = false,
        ...props
    },
    ref
) {
    const input = ref ?? useRef(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                ref={input}
                type={type}
                name={name}
                value={value}
                required={required}
                onChange={(e) => {
                    if (handleChange) return handleChange(e);
                    if (onChange) return onChange(e);
                }}
                autoComplete={autoComplete}
                placeholder={placeholder}
                aria-invalid={isError ? "true" : "false"}
                className={`rounded-2xl bg-form-bg py-[13px] px-7 w-full input-${variant} ${
                    isError ? "input-error" : ""
                } ${className}`}
            />
        </div>
    );
});

TextInput.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password", "number", "file"]),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "error", "primary-outline"]),
    autoComplete: PropTypes.string,
    required: PropTypes.bool,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    isFocused: PropTypes.bool,
    isError: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default TextInput;
