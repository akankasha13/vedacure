export default function Errors({ errors }) {
  return (
    <ul className="mx-auto w-full space-y-3 rounded-xl border-2 border-red-500 px-1 py-3 text-center text-xs font-medium text-white shadow-md shadow-[#ff000099]">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}
