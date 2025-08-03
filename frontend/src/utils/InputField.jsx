export default function InputField({placeholder, type, onChange, value, name, max}){
    return(
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
            className="p-3 border rounded-lg focus:ring-2 outline-0"
            min="1"
            max={max}
        />
    )
}