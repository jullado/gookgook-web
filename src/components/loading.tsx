export default function Loading({message = "กำลังโหลด"}: {message?: string}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="text-gray-400 text-xl animate-pulse">{message}...</div>
    </div>
  );
}
