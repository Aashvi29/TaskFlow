function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-blue-600">
          TaskFlow
        </h1>

        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Home
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600">
            Tasks
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;