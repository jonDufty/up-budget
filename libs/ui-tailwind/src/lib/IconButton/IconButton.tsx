/* eslint-disable-next-line */
export interface IconButtonProps {
  icon: React.ReactNode;
}

export function IconButton({ icon }: IconButtonProps) {
  return (
    <button
      type="button"
      className="middle none center rounded-full bg-pink-500 p-3 text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      {icon}
    </button>
  );
}

export default IconButton;
