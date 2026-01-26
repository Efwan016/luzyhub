export default function InputLabel({ value, className = '', children, forInput, ...props }) {
    return (
        <label htmlFor={forInput} {...props} className={`text-base block mb-2 ` + className}>
            {value ? value : children}
        </label>
    );
}
