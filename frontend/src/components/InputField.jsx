function InputField({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <Icon
        size={18}
        className="absolute left-4 top-4 text-[#7BAE7F]"
      />

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        border
        border-[#DDEFD8]
        rounded-xl
        py-3
        pl-12
        pr-4
        outline-none
        focus:ring-2
        focus:ring-[#A8C3A0]
        focus:border-[#7BAE7F]
        "
      />

    </div>
  );
}

export default InputField;