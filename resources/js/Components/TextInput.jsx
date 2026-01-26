import { forwardRef, useEffect, useRef } from 'react';
import PropType from 'prop-types';

const TextInput = forwardRef(function TextInput({ type = 'text', name='', value, className, autoComplete = '',defaultValue = '', required, handleChange, variant = 'primary', isFocused = false, placeholder, isError = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                `rounded-2xl bg-form-bg py-[13px] px-7 w-full ${isError ? 'input-error' : ''} input-${variant} ${className}` 
                }
                ref={input}
                name={name}
                value={value}
                required={required}
                onChange={(e) => handleChange(e)}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                placeholder={placeholder}
                aria-invalid={isError ? 'true' : 'false'}
            />
        </div>
    );
});

TextInput.propTypes = {
    type: PropType.oneOf(['text', 'email', 'password', 'number', 'file']),
    name: PropType.string,
    value: PropType.oneOfType([PropType.string, PropType.number]),
    defaultValue: PropType.oneOfType([PropType.string, PropType.number]),
    className: PropType.string,
    variant: PropType.oneOf(['primary', 'error', 'primary-outline']),
    autoComplete: PropType.string,
    required: PropType.bool,
    handleChange: PropType.func,
    isFocused: PropType.bool,
    isError: PropType.bool,
    placeholder: PropType.string,
}

export default TextInput;
