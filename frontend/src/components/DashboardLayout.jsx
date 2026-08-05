function DashboardLayout({ sidebar, navbar, children }) {
  return (
    <div className="min-h-screen bg-[#F6F8F2]">

      {navbar}

      <div className="flex">

        {sidebar}

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;