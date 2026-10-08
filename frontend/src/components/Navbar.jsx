function Navbar() {
  return (
    <nav className="bg-[#C9D8D4]">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="bg-[#FCFAF7] border border-[#DDD8DF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_6px_20px_rgba(47,43,66,0.06)]">

          <h1 className="text-2xl font-semibold text-[#272544] tracking-tight">
            TaskFlow
          </h1>

          <div className="flex gap-6">
            <a
  href="#"
  className="text-[#6F6878] font-medium transition-colors duration-200 hover:text-[#684C68]"
>
  Home
</a>

           <a
  href="#"
  className="text-[#6F6878] font-medium transition-colors duration-200 hover:text-[#684C68]"
>
  Tasks
</a>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;