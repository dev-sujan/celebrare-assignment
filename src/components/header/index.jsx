const Header = ({ children }) => {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 bg-white py-2 text-center text-xl font-bold shadow-md">
      {children}
    </header>
  );
};

export default Header;
