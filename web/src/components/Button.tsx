type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: Props) => {
  const defaultClassName =
    "px-2 py-1 border border-slate-200 rounded-lg text-md bg-slate-600";
  return (
    <button
      type="button"
      className={
        className ? defaultClassName + " " + className : defaultClassName
      }
      {...props}
    ></button>
  );
};

export default Button;
