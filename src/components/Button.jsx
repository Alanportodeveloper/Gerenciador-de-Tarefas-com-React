function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-slate-400 p-2 rounded-md text-white flex items-center justify-center"
    >
      {children}
    </button>
  );
}

export default Button;
